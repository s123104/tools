# 部署指南 / Deployment Guide

## 資料庫 Migration 問題解決方案

### 問題描述
在部署環境（Docker、Vercel 等）中，`npm run build` 不應該執行資料庫 migration，因為 build 階段通常沒有資料庫連接。

### 解決方案

#### 1. Build 階段（不執行 Migration）
```bash
npm run build
```

這個命令只會編譯 Next.js 應用，不會嘗試連接資料庫。

#### 2. 生產環境啟動（包含 Migration）

**選項 A：使用 start:migrate（推薦）**
```bash
npm run start:migrate
```

這會先執行資料庫 migration，然後啟動應用。

**選項 B：分開執行**
```bash
npm run db:migrate
npm run start
```

### 不同平台的配置

#### Vercel
在 Vercel 項目設置中：

1. **Build Command**:
   ```bash
   npm run build
   ```

2. **環境變量**:
   - 設置 `DATABASE_URL` 指向你的生產資料庫（例如 Vercel Postgres）
   - 設置 `POSTGRES_URL` 如果使用 Vercel Postgres

3. **Post-deployment Hook**（可選）:
   在 `vercel.json` 中添加：
   ```json
   {
     "buildCommand": "npm run build",
     "installCommand": "npm install"
   }
   ```

#### Docker

**Dockerfile 範例**:
```dockerfile
FROM node:20-alpine AS base

# 安裝依賴
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 編譯應用（不執行 migration）
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 生產環境
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

EXPOSE 3000
ENV PORT 3000

# 啟動時執行 migration
CMD ["sh", "-c", "npm run db:migrate && node server.js"]
```

**docker-compose.yml 範例**:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/dbname
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=dbname
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Railway / Render / Fly.io

1. **Build Command**:
   ```bash
   npm run build
   ```

2. **Start Command**:
   ```bash
   npm run start:migrate
   ```

3. **環境變量**:
   設置你的 `DATABASE_URL`

### 開發環境

開發環境使用 PGlite（內存資料庫），會自動處理 migration：

```bash
npm run dev
```

這會：
1. 啟動 PGlite 伺服器
2. 自動執行 migration
3. 啟動 Next.js 開發伺服器

### 本地測試生產 Build

```bash
# 使用內存資料庫進行本地測試
npm run build-local
```

### 常見問題

**Q: 為什麼不在 build 時執行 migration？**
A: Build 階段應該是無狀態的，只編譯程式碼。Migration 需要資料庫連接，應該在 runtime 執行。

**Q: 如何在 CI/CD 中執行 migration？**
A: 在部署後使用 `npm run db:migrate` 作為單獨的步驟，或使用 `npm run start:migrate`。

**Q: Vercel 上如何執行 migration？**
A: Vercel 不支持在部署時執行腳本。建議：
- 使用 Vercel Postgres 並在首次部署後手動執行 migration
- 或者使用 Vercel Serverless Function 作為 migration endpoint
- 或者在應用啟動時檢查並執行必要的 migration

### 腳本說明

- `npm run build` - 僅編譯，不執行 migration（用於生產部署）
- `npm run build-local` - 使用內存資料庫的本地 build
- `npm run dev` - 開發模式（自動處理 migration）
- `npm run start` - 啟動應用（不執行 migration）
- `npm run start:migrate` - 執行 migration 後啟動應用（生產環境推薦）
- `npm run db:migrate` - 僅執行資料庫 migration
- `npm run db:generate` - 生成 migration 文件
