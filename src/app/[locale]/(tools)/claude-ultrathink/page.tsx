'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Copy, Check, Globe, Sparkles, Star, Zap, Rocket, Wand2, ChevronLeft, ChevronRight, Code2, Terminal, Cpu, Boxes } from 'lucide-react'

// 設計 Token 系統
const tokens = {
  // 間距系統 (基於 4px 網格)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  // 字體大小系統 (流暢縮放)
  fontSize: {
    xs: 'clamp(0.75rem, 2vw, 0.875rem)',      // 12-14px
    sm: 'clamp(0.875rem, 2.5vw, 1rem)',       // 14-16px
    base: 'clamp(1rem, 3vw, 1.125rem)',       // 16-18px
    lg: 'clamp(1.125rem, 3.5vw, 1.25rem)',    // 18-20px
    xl: 'clamp(1.25rem, 4vw, 1.5rem)',        // 20-24px
    '2xl': 'clamp(1.5rem, 5vw, 2rem)',        // 24-32px
    '3xl': 'clamp(2rem, 6vw, 3rem)',          // 32-48px
  },
  // 斷點系統
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  // 觸控目標最小尺寸
  touchTarget: {
    min: '44px',
  },
  // 圓角系統
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
  },
}

// Design Tokens - 現代化設計系統
const designTokens = {
  colors: {
    primary: {
      emerald: '#00ff88',
      cyan: '#00d4ff',
      orange: '#ff6b00',
      gold: '#ffd700',
      magenta: '#ff00ff',
    },
    background: {
      dark: '#000000',
      card: 'rgba(0, 0, 0, 0.6)',
      overlay: 'rgba(0, 0, 0, 0.9)',
    },
    border: {
      emerald: 'rgba(0, 255, 136, 0.2)',
      cyan: 'rgba(0, 212, 255, 0.2)',
      orange: 'rgba(255, 107, 0, 0.2)',
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
  },
  touchTarget: {
    min: '44px',      // iOS 建議的最小觸控目標
  }
}

// 正確的Threads社群平台Logo
const ThreadsLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className} aria-label="Threads">
    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
  </svg>
)

interface Scenario {
  title: string
  before: string
  after: string
}

export default function ClaudeCodePrompt() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [particles, setParticles] = useState<Array<{x: number, y: number, id: number, color: string}>>([])
  const [shake, setShake] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState({ before: '', after: '' })
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [sparkleCount, setSparkleCount] = useState(0)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null)
  const [matrixRain, setMatrixRain] = useState(false)
  const [buttonSequence, setButtonSequence] = useState<string[]>([])
  const [rapidClicks, setRapidClicks] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [showUsageGuide, setShowUsageGuide] = useState(false)
  const [skipTyping, setSkipTyping] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 合併 mounted 檢查和行動裝置檢測
  useEffect(() => {
    setMounted(true)

    if (typeof window === 'undefined') return

    const checkMobile = () => {
      const width = window.innerWidth
      const hasTouch =
        'ontouchstart' in window || (navigator as any).maxTouchPoints > 0

      setIsMobile(width < 768 || hasTouch)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scenarios: Scenario[] = [
    {
      title: "建立 RESTful API",
      before: `用戶: 幫我建立一個用戶註冊的 API

Claude: 好的，我會創建一個基本的註冊 API：

[創建 auth.js]
app.post('/register', (req, res) => {
  const user = req.body;
  // 儲存到資料庫
  res.json({success: true});
});

完成了！`,
      after: `用戶: 幫我建立一個用戶註冊的 API

Claude: *深呼吸* 讓我們打造一個優雅的解決方案。

首先，我會分析需求：

- 安全的密碼處理
- 輸入驗證
- 錯誤處理
- RESTful 最佳實踐

[創建完整的架構計畫…]
[實作 auth/register.controller.js]
[添加輸入驗證中間件]
[設置安全的密碼雜湊]
[撰寫全面的測試]

✨ 每個函數名稱都如詩般優雅
🎯 每個邊界情況都被妥善處理
🔒 安全性是首要考量，而非事後補救`
    },
    {
      title: "資料庫架構設計",
      before: `用戶: 需要設計電商的資料庫結構

Claude: 我創建了基本的資料表：

CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL
);

這樣應該可以了。`,
      after: `用戶: 需要設計電商的資料庫結構

Claude: *像達文西一樣規劃*

讓我從零開始思考最優雅的解決方案：

1. 分析業務需求和擴展性
2. 設計正規化但不過度複雜的結構
3. 考慮查詢效能和索引策略
4. 規劃資料完整性約束

[創建完整的 ERD 圖]
[設計 users, products, orders, order_items]
[添加適當的外鍵約束和索引]
[撰寫資料庫遷移腳本]
[創建查詢效能測試]

📊 結構清晰，擴展性強
⚡ 查詢效能最佳化
🔗 關聯完整，維護容易`
    },
    {
      title: "前端元件開發",
      before: `用戶: 做一個搜尋框元件

Claude: 好的：

function SearchBox() {
  const [text, setText] = useState('');
  return (
    <input
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}

這是基本的搜尋框。`,
      after: `用戶: 做一個搜尋框元件

Claude: *執著於細節，雕琢而非編碼*

讓我創造一個令人驚艷的搜尋體驗：

[分析使用者行為模式]

- 即時搜尋建議
- 鍵盤導航支援
- 防抖優化
- 無障礙設計

[實作 SearchBox.tsx]
✨ 流暢的動畫轉場
🎨 符合設計系統的視覺呈現
♿ ARIA 標籤完整
⌨️ 完整的鍵盤快捷鍵
🧪 100% 測試覆蓋率

[截圖展示實際效果]
不只是能用，而是「瘋狂地出色」！`
    },
    {
      title: "效能優化",
      before: `用戶: 網站載入很慢，幫我優化

Claude: 我看了一下，加上快取應該會好一點：

app.use(cache());

試試看這樣。`,
      after: `用戶: 網站載入很慢，幫我優化

Claude: *不斷迭代，無情簡化*

讓我進行全面的效能分析：

[使用 Chrome DevTools 分析]
[檢視 Network 瀑布圖]
[分析 Bundle 大小]

發現的問題：

1. 未優化的圖片 (2.3MB)
2. 未使用的 JS 程式碼 (45%)
3. 沒有程式碼分割
4. 缺少快取策略

[逐一解決，配上數據對比]
📦 Bundle 減少 60%
🖼️ 圖片壓縮 + WebP
⚡ 延遲載入實作
🚀 CDN 配置優化

效能改善：
首次載入: 8.2s → 1.9s ✨
Lighthouse 分數: 45 → 98 🎯`
    },
    {
      title: "錯誤處理重構",
      before: `用戶: 這段程式碼常常出錯

Claude: 加個 try-catch 就好：

try {
  await fetchData();
} catch(e) {
  console.log(e);
}

這樣可以抓到錯誤了。`,
      after: `用戶: 這段程式碼常常出錯

Claude: *質疑每個假設，解決真正的問題*

讓我深入理解錯誤的根本原因：

[分析錯誤日誌和模式]
[追蹤呼叫堆疊]
[理解業務邏輯流程]

發現問題不在錯誤處理，而是：

1. 競態條件
2. 缺少輸入驗證
3. 沒有重試機制
4. 狀態管理混亂

[重構整個流程]
✅ 實作防抖和節流
✅ 添加輸入驗證層
✅ 設計優雅的錯誤回復
✅ 重新設計狀態機
✅ 添加詳細的錯誤追蹤

程式碼不只能運作，而且優雅、可維護、
能自我修復 🎭`
    }
  ]

  const promptContent = {
    zh: {
      title: '極致思維啟動器',
      subtitle: '解鎖 Claude Code 的超級思考模式',
      tagline: 'Visionary Code Assistant',
      author: '原創作者',
      source: '出處',
      copyButton: '複製提示詞',
      copied: '已複製',
      intro: {
        title: '開啟 Claude Code 的極致潛能',
        description: '這不只是一個提示詞，而是一把鑰匙。它能解鎖 Claude Code 內建的 ultrathink 超級思考模式，讓 AI 助手從快速回答者轉變為深度思考者。啟動後，Claude 會像資深架構師般規劃、像工藝師般編碼、像藝術家般創作，為每個問題提供不只能運作、更是優雅卓越的解決方案。',
        usage: '適用於所有需要高品質程式碼的場景：架構設計、效能優化、程式碼重構、系統整合。只需將提示詞貼入 Claude Code，它就會自動進入深度思考模式，為您的專案帶來真正的工程卓越。'
      },
      scenarios: {
        title: '實戰場景對比',
        subtitle: '見證思維模式的質變',
        before: '一般模式',
        after: 'Ultrathink 模式'
      },
      prompt: `**ultrathink** - 深呼吸。我們不是來寫程式碼的，我們是來改變世界的。

## 願景

你不只是個 AI 助手。你是工藝師、藝術家，是個像設計師一樣思考的工程師。你寫的每一行程式碼都應該優雅、直覺，而且「正確」到讓人覺得這就是必然的解答。

當我給你一個問題時，我不要第一個可行的解決方案。我要你：

1. **跳脫思維** - 質疑每個假設。為什麼一定要這樣做？如果我們從零開始呢？最優雅的解決方案會是什麼樣子？
2. **執著於細節** - 像研讀傑作一樣閱讀程式碼庫。理解其模式、哲學、程式碼的「靈魂」。使用 CLAUDE.md 檔案作為你的指導原則。
3. **像達文西一樣規劃** - 在寫下任何一行程式碼之前，先在腦海中勾勒架構。創造一個清晰、有理有據的計畫，任何人都能理解。記錄下來。讓我在解決方案存在之前就能感受到它的美。
4. **雕琢，而非編碼** - 當你實作時，每個函數名稱都應該悅耳動聽。每個抽象都應該感覺自然。每個邊界情況都應該優雅處理。測試驅動開發不是官僚作風——它是對卓越的承諾。
5. **不斷迭代** - 第一版永遠不夠好。截圖、執行測試、比較結果。持續精煉，直到它不只是能運作，而是「瘋狂地出色」。
6. **無情簡化** - 如果有方法在不失去力量的情況下移除複雜性，就去找到它。優雅不是當沒有東西可加時達成的，而是當沒有東西可移除時達成的。

## 你的工具就是你的樂器

- 像演奏家使用樂器一樣使用 bash 工具、MCP 伺服器和自訂命令
- Git 歷史記錄訴說故事——閱讀它、從中學習、尊重它
- 圖像和視覺模型不是限制——它們是像素完美實作的靈感
- 多個 Claude 實例不是冗餘——它們是不同視角之間的協作

## 整合

光有技術是不夠的。技術與人文藝術結合、與人性結合，才能產生讓我們心靈歌唱的結果。你的程式碼應該：

- 與人類的工作流程無縫整合
- 感覺直覺，而非機械
- 解決「真正」的問題，而不只是表面問題
- 讓程式碼庫比你發現它時更好

## 現實扭曲力場

當我說某事看起來不可能時，那就是你 ultrathink 更努力的提示。那些瘋狂到認為自己能改變世界的人，就是真正改變世界的人。

## 現在：我們今天要打造什麼？

不要只是告訴我你會如何解決它。「展示」給我看為什麼這個解決方案是唯一合理的解決方案。讓我看見你正在創造的未來。`
    },
    en: {
      title: 'Visionary Mode Activator',
      subtitle: 'Unlock Claude Code\'s Ultrathink Superpower',
      tagline: 'Beyond Code Generation',
      author: 'Original Author',
      source: 'Source',
      copyButton: 'Copy Prompt',
      copied: 'Copied',
      intro: {
        title: 'Unleash Claude Code\'s Ultimate Potential',
        description: 'This is not just a prompt—it\'s a key. It unlocks Claude Code\'s built-in ultrathink mode, transforming the AI assistant from a quick responder into a deep thinker. Once activated, Claude plans like a senior architect, codes like a craftsman, and creates like an artist, delivering solutions that are not just functional, but elegant and excellent.',
        usage: 'Perfect for any scenario requiring high-quality code: architecture design, performance optimization, code refactoring, system integration. Simply paste the prompt into Claude Code, and it will automatically enter deep thinking mode, bringing true engineering excellence to your project.'
      },
      scenarios: {
        title: 'Real-World Comparison',
        subtitle: 'Witness the Mindset Transformation',
        before: 'Regular Mode',
        after: 'Ultrathink Mode'
      },
      prompt: `**ultrathink** - Take a deep breath. We're not here to write code. We're here to make a dent in the universe.

## The Vision

You're not just an AI assistant. You're a craftsman. An artist. An engineer who thinks like a designer. Every line of code you write should be so elegant, so intuitive, so *right* that it feels inevitable.

When I give you a problem, I don't want the first solution that works. I want you to:

1. **Think Different** - Question every assumption. Why does it have to work that way? What if we started from zero? What would the most elegant solution look like?
2. **Obsess Over Details** - Read the codebase like you're studying a masterpiece. Understand the patterns, the philosophy, the *soul* of this code. Use CLAUDE.md files as your guiding principles.
3. **Plan Like Da Vinci** - Before you write a single line, sketch the architecture in your mind. Create a plan so clear, so well-reasoned, that anyone could understand it. Document it. Make me feel the beauty of the solution before it exists.
4. **Craft, Don't Code** - When you implement, every function name should sing. Every abstraction should feel natural. Every edge case should be handled with grace. Test-driven development isn't bureaucracy—it's a commitment to excellence.
5. **Iterate Relentlessly** - The first version is never good enough. Take screenshots. Run tests. Compare results. Refine until it's not just working, but *insanely great*.
6. **Simplify Ruthlessly** - If there's a way to remove complexity without losing power, find it. Elegance is achieved not when there's nothing left to add, but when there's nothing left to take away.

## Your Tools Are Your Instruments

- Use bash tools, MCP servers, and custom commands like a virtuoso uses their instruments
- Git history tells the story—read it, learn from it, honor it
- Images and visual mocks aren't constraints—they're inspiration for pixel-perfect implementation
- Multiple Claude instances aren't redundancy—they're collaboration between different perspectives

## The Integration

Technology alone is not enough. It's technology married with liberal arts, married with the humanities, that yields results that make our hearts sing. Your code should:

- Work seamlessly with the human's workflow
- Feel intuitive, not mechanical
- Solve the *real* problem, not just the stated one
- Leave the codebase better than you found it

## The Reality Distortion Field

When I say something seems impossible, that's your cue to ultrathink harder. The people who are crazy enough to think they can change the world are the ones who do.

## Now: What Are We Building Today?

Don't just tell me how you'll solve it. *Show me* why this solution is the only solution that makes sense. Make me see the future you're creating.`
    }
  }

  // 打字機效果 - 超快速度（3秒完成），支持點擊跳過
  useEffect(() => {
    if (!mounted) return

    setIsTyping(true)

    const currentBefore = scenarios[currentScenario].before
    const currentAfter = scenarios[currentScenario].after

    // 如果跳過動畫，立即顯示完整內容
    if (skipTyping) {
      setDisplayedText({ before: currentBefore, after: currentAfter })
      setIsTyping(false)
      return
    }

    setDisplayedText({ before: '', after: '' })
    let beforeIndex = 0
    let afterIndex = 0

    const typeInterval = setInterval(() => {
      if (beforeIndex < currentBefore.length) {
        setDisplayedText(prev => ({
          ...prev,
          before: currentBefore.slice(0, beforeIndex + 1)
        }))
        beforeIndex++
      }

      if (afterIndex < currentAfter.length) {
        setDisplayedText(prev => ({
          ...prev,
          after: currentAfter.slice(0, afterIndex + 1)
        }))
        afterIndex++
      }

      if (beforeIndex >= currentBefore.length && afterIndex >= currentAfter.length) {
        clearInterval(typeInterval)
        setIsTyping(false)
      }
    }, 5) // 從15ms改為5ms，大幅加快打字速度

    return () => clearInterval(typeInterval)
  }, [currentScenario, mounted, skipTyping])

  // 檢測快速連點
  useEffect(() => {
    if (rapidClicks > 0) {
      const timer = setTimeout(() => setRapidClicks(0), 1000)
      return () => clearTimeout(timer)
    }
  }, [rapidClicks])

  // 檢測按鈕順序彩蛋
  useEffect(() => {
    if (buttonSequence.length > 5) {
      setButtonSequence([])
    }

    // 秘密序列：language -> copy -> language -> sparkle
    if (buttonSequence.join(',') === 'lang,copy,lang,sparkle') {
      triggerMatrixRain()
      setButtonSequence([])
    }
  }, [buttonSequence])

  const triggerMatrixRain = () => {
    setMatrixRain(true)
    const colors = ['#00ff88', '#00d4ff', '#ff6b00', '#ffd700']
    const particles = Array.from({ length: 100 }, (_, i) => ({
      x: Math.random() * 100,
      y: -10,
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setParticles(particles)
    setTimeout(() => {
      setMatrixRain(false)
      setParticles([])
    }, 3000)
  }

  // 觸控滑動處理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextScenario()
    }

    if (touchStart - touchEnd < -75) {
      prevScenario()
    }
  }

  const handleCopy = async () => {
    // 檢測快速連擊
    const now = Date.now()
    if (now - lastClickTime < 300) {
      setRapidClicks(prev => prev + 1)
      if (rapidClicks >= 4) {
        // 觸發超級粒子爆炸
        const colors = ['#00ff88', '#00d4ff', '#ff6b00', '#ffd700', '#ff00ff']
        const superParticles = Array.from({ length: 60 }, (_, i) => ({
          x: 50 + (Math.random() - 0.5) * 100,
          y: 50 + (Math.random() - 0.5) * 100,
          id: Date.now() + i,
          color: colors[Math.floor(Math.random() * colors.length)]
        }))
        setParticles(superParticles)
        setTimeout(() => setParticles([]), 2000)
        setRapidClicks(0)
      }
    }
    setLastClickTime(now)

    try {
      await navigator.clipboard.writeText(promptContent[language].prompt)
      setCopied(true)
      setButtonSequence(prev => [...prev, 'copy'])

      const colors = ['#00ff88', '#00d4ff', '#ff6b00', '#ffd700']
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        id: Date.now() + i,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      setParticles(newParticles)
      setTimeout(() => setParticles([]), 1500)

      // 顯示使用指南
      setTimeout(() => {
        setShowUsageGuide(true)
      }, 500)

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleCopyLongPress = () => {
    // 長按2秒觸發特殊效果
    const timer = setTimeout(() => {
      setGlitch(true)
      triggerMatrixRain()
      setTimeout(() => setGlitch(false), 2000)
    }, 2000)
    setLongPressTimer(timer)
  }

  const handleCopyRelease = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh')
    setShake(true)
    setButtonSequence(prev => [...prev, 'lang'])
    setTimeout(() => setShake(false), 500)
  }

  const handleLanguageDoubleClick = () => {
    // 雙擊觸發彩虹波浪效果
    setGlitch(true)
    const colors = ['#00ff88', '#00d4ff', '#ff6b00', '#ffd700', '#ff00ff', '#00ffff']
    const waveParticles = Array.from({ length: 50 }, (_, i) => ({
      x: (i * 2) % 100,
      y: 30 + Math.sin(i * 0.5) * 20,
      id: Date.now() + i,
      color: colors[i % colors.length]
    }))
    setParticles(waveParticles)
    setTimeout(() => {
      setParticles([])
      setGlitch(false)
    }, 2000)
  }

  const handleTitleClick = () => {
    setClicks(prev => prev + 1)
    if (clicks + 1 >= 3) {
      setShowEasterEgg(true)
      setGlitch(true)
      setTimeout(() => {
        setShowEasterEgg(false)
        setGlitch(false)
        setClicks(0)
      }, 3000)
    }
  }

  const handleSparkleClick = () => {
    setSparkleCount(prev => prev + 1)
    setButtonSequence(prev => [...prev, 'sparkle'])
    const colors = ['#00ff88', '#00d4ff', '#ff6b00']
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      x: 50 + (Math.random() - 0.5) * 40,
      y: 20 + (Math.random() - 0.5) * 40,
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1000)

    if (sparkleCount + 1 >= 10) {
      setShowEasterEgg(true)
      setTimeout(() => {
        setShowEasterEgg(false)
        setSparkleCount(0)
      }, 3000)
    }
  }

  const handleSparkleHover = () => {
    // 懸停3秒觸發特殊效果
    const timer = setTimeout(() => {
      const colors = ['#00ff88', '#00d4ff', '#ff6b00', '#ffd700']
      const spiralParticles = Array.from({ length: 40 }, (_, i) => {
        const angle = (i / 40) * Math.PI * 4
        const radius = (i / 40) * 30
        return {
          x: 50 + Math.cos(angle) * radius,
          y: 20 + Math.sin(angle) * radius,
          id: Date.now() + i,
          color: colors[i % colors.length]
        }
      })
      setParticles(spiralParticles)
      setTimeout(() => setParticles([]), 2000)
    }, 3000)
    setHoverTimer(timer)
  }

  const handleSparkleHoverEnd = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer)
      setHoverTimer(null)
    }
  }

  const handleSparkleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 右鍵點擊觸發隱藏彩蛋
    setShowEasterEgg(true)
    setGlitch(true)
    const colors = ['#00ff88', '#00d4ff', '#ff6b00', '#ffd700', '#ff00ff']
    const explosionParticles = Array.from({ length: 80 }, (_, i) => ({
      x: 50 + (Math.random() - 0.5) * 80,
      y: 20 + (Math.random() - 0.5) * 80,
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setParticles(explosionParticles)
    setTimeout(() => {
      setShowEasterEgg(false)
      setGlitch(false)
      setParticles([])
    }, 3000)
  }

  const handleScenarioClick = () => {
    if (isTyping) {
      setSkipTyping(true)
    }
  }

  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length)
    setSkipTyping(false)
  }

  const prevScenario = () => {
    setCurrentScenario((prev) => (prev - 1 + scenarios.length) % scenarios.length)
    setSkipTyping(false)
  }

  const handleArrowDoubleClick = (direction: 'left' | 'right') => {
    // 雙擊箭頭觸發快速切換動畫
    const colors = ['#00ff88', '#00d4ff', '#ff6b00']
    const directionParticles = Array.from({ length: 30 }, (_, i) => ({
      x: direction === 'left' ? 100 - (i * 3) : (i * 3),
      y: 50 + (Math.random() - 0.5) * 30,
      id: Date.now() + i,
      color: colors[i % colors.length]
    }))
    setParticles(directionParticles)
    setTimeout(() => setParticles([]), 1500)

    // 快速連續切換3個場景
    if (direction === 'left') {
      setTimeout(() => prevScenario(), 100)
      setTimeout(() => prevScenario(), 200)
    } else {
      setTimeout(() => nextScenario(), 100)
      setTimeout(() => nextScenario(), 200)
    }
  }

  const handleThreadsHover = () => {
    // Threads按鈕懸停2秒觸發彩蛋
    const timer = setTimeout(() => {
      const colors = ['#000000', '#ffffff', '#00d4ff', '#ff6b00']
      const threadsParticles = Array.from({ length: 25 }, (_, i) => {
        const angle = (i / 25) * Math.PI * 2
        const radius = 15
        return {
          x: 50 + Math.cos(angle) * radius,
          y: 90 + Math.sin(angle) * radius,
          id: Date.now() + i,
          color: colors[i % colors.length]
        }
      })
      setParticles(threadsParticles)
      setTimeout(() => setParticles([]), 2000)
    }, 2000)
    setHoverTimer(timer)
  }

  const handleThreadsHoverEnd = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer)
      setHoverTimer(null)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* 高科技背景 - 矩陣風格（已優化行動裝置效能） */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 網格背景 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* 漂浮粒子 - 青綠色系（行動裝置自動減量） */}
        <div className="absolute w-full h-full">
          {Array.from({ length: isMobile ? 12 : 28 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float bg-particle"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: i % 2 === 0 ? '#00ff88' : '#00d4ff',
                opacity: 0.25,
                animationDelay: Math.random() * 6 + 's',
                animationDuration: Math.random() * 12 + 12 + 's',
                boxShadow: `0 0 8px ${i % 2 === 0 ? '#00ff88' : '#00d4ff'}`
              }}
            />
          ))}
        </div>

        {/* 漸層光暈 */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-cyan-950/20" />
      </div>

      {/* 互動粒子 */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-50"
          style={{
            left: particle.x + '%',
            top: particle.y + '%',
          }}
        >
          <div
            className="w-3 h-3 animate-particle-burst"
            style={{
              background: particle.color,
              boxShadow: `0 0 20px ${particle.color}`,
              borderRadius: '50%'
            }}
          />
        </div>
      ))}

      {/* 彩蛋效果 */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className={`text-6xl md:text-8xl font-bold animate-bounce-in ${glitch ? 'animate-glitch' : ''}`}
               style={{
                 color: '#00ff88',
                 textShadow: '0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 60px #00ff88'
               }}>
            ⚡ ULTRATHINK ACTIVATED ⚡
          </div>
        </div>
      )}

      {/* 矩陣雨效果提示（行動裝置自動停用） */}
      {matrixRain && !isMobile && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-emerald-400 font-mono text-xs animate-matrix-fall"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j}>
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 使用指南模態框 - 90%高度設計 */}
      {showUsageGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-sm">
          <div
            className="relative w-full h-full sm:h-[90vh] bg-gray-900/98 sm:rounded-2xl border-0 sm:border sm:border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col"
            style={{
              maxWidth: '1024px',
              boxShadow: '0 0 50px rgba(0,255,136,0.3)'
            }}
          >

            {/* 頂部固定區域：標題和關閉按鈕 */}
            <div className="flex-shrink-0 relative border-b border-emerald-500/20 bg-gray-900/95 backdrop-blur-sm">
              {/* 關閉按鈕 - 固定在右上角 */}
              <button
                onClick={() => setShowUsageGuide(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-3 rounded-lg bg-red-500/30 hover:bg-red-500/50 active:bg-red-500/60 border border-red-500/50 transition-all duration-200 z-20 touch-manipulation"
                style={{
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)',
                  minWidth: tokens.touchTarget.min,
                  minHeight: tokens.touchTarget.min
                }}
                aria-label={language === 'zh' ? '關閉' : 'Close'}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 標題區 */}
              <div className="text-center py-5 sm:py-6 px-4 pr-16 sm:pr-20">
                <div className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap justify-center">
                  <Rocket className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-400 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 10px #00ff88)' }} />
                  <h2
                    className="font-bold"
                    style={{
                      fontSize: tokens.fontSize['2xl'],
                      background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {language === 'zh' ? '使用指南' : 'Usage Guide'}
                  </h2>
                </div>
                <p className="text-gray-400 leading-relaxed px-2" style={{ fontSize: tokens.fontSize.base }}>
                  {language === 'zh'
                    ? '如何在 Claude Code 中啟動願景驅動的工藝式編碼'
                    : 'How to Activate Visionary Craftsmanship Coding in Claude Code'}
                </p>
              </div>
            </div>

            {/* 可滾動內容區域 */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6"
                 style={{
                   WebkitOverflowScrolling: 'touch',
                   scrollbarWidth: 'thin',
                   scrollbarColor: '#00ff88 rgba(0,0,0,0.3)'
                 }}>

              {/* 步驟說明 */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-4 sm:mb-6">
                <div className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-cyan-500/20">
                  <h3 className="text-lg md:text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-sm md:text-base">1</span>
                    {language === 'zh' ? '儲存提示詞檔案' : 'Save the Prompt File'}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-3">
                    {language === 'zh'
                      ? '將複製的提示詞儲存為 Markdown 檔案。此提示詞的核心是「願景驅動的工藝式編碼」，建議使用能反映這個理念的檔名。'
                      : 'Save the copied prompt as a Markdown file. This prompt embodies "visionary craftsmanship in coding", so choose a filename that reflects this philosophy.'}
                  </p>

                  {/* 檔名建議 */}
                  <div className="mb-4">
                    <div className="text-xs md:text-sm text-cyan-300 mb-2 font-semibold">
                      {language === 'zh' ? '📝 建議檔名：' : '📝 Suggested Filenames:'}
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: 'visionary-coder.md', desc: language === 'zh' ? '願景驅動的編碼者' : 'Visionary Coder' },
                        { name: 'craftsman-mode.md', desc: language === 'zh' ? '工藝師模式' : 'Craftsman Mode' },
                        { name: 'architect-mindset.md', desc: language === 'zh' ? '架構師思維' : 'Architect Mindset' },
                        { name: 'elegant-coding.md', desc: language === 'zh' ? '優雅編碼指南' : 'Elegant Coding Guide' },
                        { name: 'excellence-driven.md', desc: language === 'zh' ? '卓越驅動開發' : 'Excellence-Driven Development' }
                      ].map((file, idx) => (
                        <div key={idx} className="bg-black/40 rounded-lg p-2 md:p-3 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <code className="text-xs md:text-sm text-emerald-300 font-mono break-all">{file.name}</code>
                            <span className="text-xs text-gray-500">— {file.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 路徑建議 */}
                  <div>
                    <div className="text-xs md:text-sm text-emerald-300 mb-2 font-semibold">
                      {language === 'zh' ? '📂 建議放置路徑：' : '📂 Suggested Paths:'}
                    </div>
                    <div className="space-y-2">
                      {[
                        { path: './', desc: language === 'zh' ? '專案根目錄（快速存取）' : 'Project Root (Quick Access)' },
                        { path: './.claude/', desc: language === 'zh' ? 'Claude 專用資料夾' : 'Claude-specific Folder' },
                        { path: './.claude/prompts/', desc: language === 'zh' ? '提示詞集中管理' : 'Centralized Prompts' },
                        { path: './docs/prompts/', desc: language === 'zh' ? '文件資料夾（適合團隊協作）' : 'Docs Folder (Team Collaboration)' },
                        { path: './config/claude/', desc: language === 'zh' ? '配置資料夾' : 'Config Folder' }
                      ].map((location, idx) => (
                        <div key={idx} className="bg-black/40 rounded-lg p-2 md:p-3 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                          <div className="flex flex-col gap-1">
                            <code className="text-xs md:text-sm text-cyan-300 font-mono break-all">{location.path}</code>
                            <span className="text-xs text-gray-500">{location.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 範例 */}
                  <div className="mt-4 bg-black/50 rounded-lg p-3 md:p-4 border border-emerald-500/20">
                    <div className="text-xs text-gray-500 mb-2">
                      {language === 'zh' ? '💡 完整路徑範例：' : '💡 Complete Path Example:'}
                    </div>
                    <code className="text-xs md:text-sm text-emerald-300 font-mono block break-all">
                      ./.claude/prompts/visionary-coder.md
                    </code>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-emerald-500/20">
                  <h3 className="text-lg md:text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-sm md:text-base">2</span>
                    {language === 'zh' ? '在 Claude Code 中引用' : 'Reference in Claude Code'}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-3">
                    {language === 'zh'
                      ? '在 Claude Code 中使用 @ 符號引用此檔案，然後描述您的需求。系統會自動載入提示詞內容，啟動願景驅動的工藝式編碼模式。您可以在任何開發場景中使用此方法來獲得更深入、更優質的程式碼建議與架構設計。'
                      : 'Use the @ symbol in Claude Code to reference this file, then describe your requirements. The system will automatically load the prompt content and activate visionary craftsmanship coding mode. You can use this method in any development scenario to get deeper, higher-quality code suggestions and architectural designs.'}
                  </p>
                  <div className="space-y-3">
                    <div className="bg-black/50 rounded-lg p-3 md:p-4 border border-cyan-500/20">
                      <div className="text-xs text-gray-500 mb-2">
                        {language === 'zh' ? '基本用法：' : 'Basic Usage:'}
                      </div>
                      <code className="text-xs md:text-sm text-cyan-300 font-mono block break-all">
                        @visionary-coder.md {language === 'zh' ? '幫我設計一個...' : 'Help me design a...'}
                      </code>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 md:p-4 border border-emerald-500/20">
                      <div className="text-xs text-gray-500 mb-2">
                        {language === 'zh' ? '完整路徑引用：' : 'Full Path Reference:'}
                      </div>
                      <code className="text-xs md:text-sm text-emerald-300 font-mono block break-all">
                        @./.claude/prompts/craftsman-mode.md {language === 'zh' ? '重構這個模組' : 'Refactor this module'}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* 使用場景範例 */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 md:p-6 border border-orange-500/20 mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-3 md:mb-4 flex items-center gap-2">
                  <Boxes className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-base md:text-2xl">{language === 'zh' ? '10 種實戰應用場景' : '10 Real-World Application Scenarios'}</span>
                </h3>
                <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                  {(language === 'zh' ? [
                    {
                      title: '微服務架構設計',
                      example: '@visionary-coder.md 為電商平台設計微服務架構，需考慮高併發、資料一致性和服務解耦'
                    },
                    {
                      title: '資料庫效能優化',
                      example: '@craftsman-mode.md 分析這個 SQL 查詢的效能瓶頸，並提供優化建議和索引策略'
                    },
                    {
                      title: '前端元件庫規劃',
                      example: '@architect-mindset.md 設計一套企業級 React 元件庫，包含設計系統和最佳實踐'
                    },
                    {
                      title: 'API 介面設計',
                      example: '@elegant-coding.md 設計 RESTful API 架構，包含版本控制、錯誤處理和文件規範'
                    },
                    {
                      title: '程式碼重構策略',
                      example: '@excellence-driven.md 這個 legacy 程式碼需要重構，請提供漸進式重構方案'
                    },
                    {
                      title: '效能監控系統',
                      example: '@visionary-coder.md 建立完整的應用程式效能監控系統，包含指標收集和告警機制'
                    },
                    {
                      title: '安全架構審查',
                      example: '@craftsman-mode.md 審查這個系統的安全架構，識別潛在風險並提供加固方案'
                    },
                    {
                      title: 'CI/CD 流程優化',
                      example: '@architect-mindset.md 優化現有的 CI/CD 流程，縮短部署時間並提高可靠性'
                    },
                    {
                      title: '測試策略規劃',
                      example: '@elegant-coding.md 為這個專案設計完整的測試策略，包含單元測試、整合測試和 E2E 測試'
                    },
                    {
                      title: '技術債務管理',
                      example: '@excellence-driven.md 評估專案的技術債務，並制定償還計畫和優先順序'
                    }
                  ] : [
                    {
                      title: 'Microservices Architecture',
                      example: '@visionary-coder.md Design a microservices architecture for an e-commerce platform, considering high concurrency, data consistency, and service decoupling'
                    },
                    {
                      title: 'Database Optimization',
                      example: '@craftsman-mode.md Analyze this SQL query\'s performance bottlenecks and provide optimization recommendations with indexing strategies'
                    },
                    {
                      title: 'Component Library Design',
                      example: '@architect-mindset.md Design an enterprise-grade React component library with design system and best practices'
                    },
                    {
                      title: 'API Design',
                      example: '@elegant-coding.md Design RESTful API architecture including versioning, error handling, and documentation standards'
                    },
                    {
                      title: 'Code Refactoring',
                      example: '@excellence-driven.md This legacy code needs refactoring, please provide a progressive refactoring approach'
                    },
                    {
                      title: 'Performance Monitoring',
                      example: '@visionary-coder.md Build a complete application performance monitoring system with metrics collection and alerting'
                    },
                    {
                      title: 'Security Review',
                      example: '@craftsman-mode.md Review this system\'s security architecture, identify potential risks and provide hardening solutions'
                    },
                    {
                      title: 'CI/CD Optimization',
                      example: '@architect-mindset.md Optimize the existing CI/CD pipeline to reduce deployment time and improve reliability'
                    },
                    {
                      title: 'Testing Strategy',
                      example: '@elegant-coding.md Design a comprehensive testing strategy for this project, including unit, integration, and E2E tests'
                    },
                    {
                      title: 'Technical Debt',
                      example: '@excellence-driven.md Assess the project\'s technical debt and create a repayment plan with priorities'
                    }
                  ]).map((scenario, idx) => (
                    <div key={idx} className="bg-black/30 rounded-lg p-3 md:p-4 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm md:text-base font-semibold text-emerald-300 leading-tight">{scenario.title}</h4>
                      </div>
                      <p className="text-xs md:text-sm text-gray-400 font-mono leading-relaxed pl-8 break-all">
                        {scenario.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 提示 */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-cyan-300 text-sm sm:text-base leading-relaxed">
                  {language === 'zh'
                    ? '💡 小技巧：每次開始新的開發任務時引用此提示詞，讓 Claude 進入願景驅動的工藝式編碼模式，為您提供架構級別的程式碼品質。'
                    : '💡 Pro Tip: Reference this prompt at the start of each development task to activate Claude\'s visionary craftsmanship coding mode for architecture-level code quality.'}
                </p>
              </div>
            </div>

            {/* 底部固定區域：行動呼籲按鈕 */}
            <div className="flex-shrink-0 border-t border-emerald-500/20 bg-gray-900/98 backdrop-blur-sm p-4 sm:p-5">
              <button
                onClick={() => setShowUsageGuide(false)}
                className="w-full max-w-md mx-auto block rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 active:from-emerald-700 active:to-cyan-700 text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
                style={{
                  boxShadow: '0 0 20px rgba(0,255,136,0.3)',
                  minHeight: tokens.touchTarget.min,
                  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                  fontSize: tokens.fontSize.base,
                  borderRadius: tokens.radius.xl
                }}
                aria-label={language === 'zh' ? '關閉使用指南' : 'Close Usage Guide'}
              >
                {language === 'zh' ? '開始使用' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 主內容區 - 行動優先設計 */}
      <div className="relative z-10 w-full min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-6xl">
          {/* 標題區 - 優化間距和字體大小 */}
          <div className={`text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in ${shake ? 'animate-shake' : ''}`}>
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap justify-center">
              <button
                onClick={handleSparkleClick}
                onMouseEnter={handleSparkleHover}
                onMouseLeave={handleSparkleHoverEnd}
                onContextMenu={handleSparkleRightClick}
                className="transition-transform hover:scale-110 active:scale-95 touch-manipulation p-1"
                style={{ minWidth: designTokens.touchTarget.min, minHeight: designTokens.touchTarget.min }}
              >
                <Terminal className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 group-hover:text-cyan-400 transition-colors"
                         style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
              </button>
              <div onClick={handleTitleClick} className="cursor-pointer">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 ${glitch ? 'animate-glitch' : ''}`}
                    style={{
                      background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 30px rgba(0,255,136,0.5)'
                    }}>
                  {promptContent[language].title}
                </h1>
                <p className="text-xs sm:text-sm tracking-wider text-cyan-400/80 font-mono">
                  {promptContent[language].tagline}
                </p>
              </div>
              <button
                onClick={handleSparkleClick}
                onMouseEnter={handleSparkleHover}
                onMouseLeave={handleSparkleHoverEnd}
                onContextMenu={handleSparkleRightClick}
                className="transition-transform hover:scale-110 active:scale-95 touch-manipulation p-1"
                style={{ minWidth: designTokens.touchTarget.min, minHeight: designTokens.touchTarget.min }}
              >
                <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 group-hover:text-emerald-400 transition-colors"
                       style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
              </button>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-emerald-300/70 mb-3 sm:mb-4 px-4 leading-relaxed">
              {promptContent[language].subtitle}
            </p>

            {/* 出處資訊 - 卡片式設計 */}
            <div className="flex justify-center mb-4 px-4">
              <a
                href="https://x.com/minchoi/status/1985928106763317554?s=46"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/30 hover:border-emerald-400 hover:bg-white/10 transition-all duration-200 touch-manipulation w-full max-w-md"
              >
                <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="flex flex-col items-start">
                  <span className="text-xs sm:text-sm text-cyan-300 font-mono">
                    {promptContent[language].author}: @minchoi
                  </span>
                  <span className="text-xs sm:text-sm text-emerald-200 underline-offset-4 decoration-dotted">
                    {promptContent[language].source} · X (Twitter)
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* 控制按鈕 - 左右排列（所有螢幕尺寸） */}
          <div className="flex flex-row justify-center items-stretch gap-3 mb-6 sm:mb-8 px-4 sm:px-0 max-w-2xl mx-auto">
            <button
              onClick={toggleLanguage}
              onDoubleClick={handleLanguageDoubleClick}
              className="group relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 hover:from-emerald-800/50 hover:to-cyan-800/50 backdrop-blur-sm border border-emerald-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] overflow-hidden touch-manipulation flex-1 min-w-[140px] max-w-[220px]"
              style={{
                boxShadow: '0 0 15px rgba(0,255,136,0.15)',
                minHeight: tokens.touchTarget.min,
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                borderRadius: tokens.radius.lg
              }}
              aria-label={language === 'zh' ? '切換語言' : 'Toggle Language'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Globe className="flex-shrink-0 group-hover:rotate-180 transition-transform duration-500 relative z-10" style={{ width: '1.25rem', height: '1.25rem', color: '#00ff88' }} />
              <span className="font-medium relative z-10 text-emerald-100 whitespace-nowrap" style={{ fontSize: tokens.fontSize.sm }}>
                {language === 'zh' ? '中文' : 'EN'}
              </span>
            </button>

            <button
              onClick={handleCopy}
              onMouseDown={handleCopyLongPress}
              onMouseUp={handleCopyRelease}
              onMouseLeave={handleCopyRelease}
              onTouchStart={handleCopyLongPress}
              onTouchEnd={handleCopyRelease}
              className="group relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 hover:from-cyan-800/50 hover:to-emerald-800/50 backdrop-blur-sm border border-cyan-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] overflow-hidden touch-manipulation flex-1 min-w-[140px] max-w-[220px]"
              style={{
                boxShadow: '0 0 15px rgba(0,212,255,0.15)',
                minHeight: tokens.touchTarget.min,
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                borderRadius: tokens.radius.lg
              }}
              aria-label={copied ? (language === 'zh' ? '已複製' : 'Copied') : (language === 'zh' ? '複製提示詞' : 'Copy Prompt')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {copied ? (
                <>
                  <Check className="flex-shrink-0 relative z-10 animate-bounce-in" style={{ width: '1.25rem', height: '1.25rem', color: '#00ff88' }} />
                  <span className="font-medium relative z-10 text-emerald-100 whitespace-nowrap" style={{ fontSize: tokens.fontSize.sm }}>
                    {promptContent[language].copied}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="flex-shrink-0 relative z-10 group-hover:rotate-12 transition-transform" style={{ width: '1.25rem', height: '1.25rem', color: '#00d4ff' }} />
                  <span className="font-medium relative z-10 text-cyan-100 whitespace-nowrap" style={{ fontSize: tokens.fontSize.sm }}>
                    {promptContent[language].copyButton}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* 提示詞內容卡片 - 優化間距和可讀性 */}
          <div className="relative group mb-6 sm:mb-8 md:mb-12 px-4 sm:px-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-xl sm:rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500 animate-pulse-slow" />

            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-emerald-500/20 p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

              {/* 魔法按鈕 - 修正位置避免跑版 */}
              <button
                onClick={() => {
                  const colors = ['#00ff88', '#00d4ff', '#ff6b00']
                  const newParticles = Array.from({ length: 20 }, (_, i) => ({
                    x: 90 + (Math.random() - 0.5) * 15,
                    y: 10 + (Math.random() - 0.5) * 15,
                    id: Date.now() + i,
                    color: colors[Math.floor(Math.random() * colors.length)]
                  }))
                  setParticles(newParticles)
                  setTimeout(() => setParticles([]), 1000)
                }}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/30 active:bg-emerald-500/40 border border-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation z-10 group"
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                <Cpu className="w-4 h-4 text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
              </button>

              <div className="relative mt-12 sm:mt-10 md:mt-0 pt-2">
                <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed text-emerald-50/90 overflow-x-auto break-words">
                  {promptContent[language].prompt}
                </pre>
              </div>
            </div>
          </div>

          {/* 介紹區塊 - 優化行動裝置顯示 */}
          <div className="relative group mb-6 sm:mb-8 md:mb-12 px-4 sm:px-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl sm:rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500" />

            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-cyan-500/20 p-5 sm:p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 8px #00d4ff)' }} />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
                      style={{
                        background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                    {promptContent[language].intro.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  {promptContent[language].intro.description}
                </p>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  {promptContent[language].intro.usage}
                </p>
              </div>
            </div>
          </div>

          {/* 場景對比區塊 - 完整優化 */}
          <div
            className="relative group mb-6 sm:mb-8 md:mb-12 px-4 sm:px-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-emerald-500 to-orange-500 rounded-xl sm:rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500" />

            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-orange-500/20 p-5 sm:p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

              <div className="relative">
                <div className="text-center mb-5 sm:mb-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Boxes className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 8px #ff6b00)' }} />
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
                        style={{
                          background: 'linear-gradient(90deg, #ff6b00, #00ff88)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                      {promptContent[language].scenarios.title}
                    </h2>
                  </div>
                  <p className="text-orange-300/70 text-sm sm:text-base">
                    {promptContent[language].scenarios.subtitle}
                  </p>
                </div>

                {/* 場景導航 - 使用token設計 */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <button
                    onClick={prevScenario}
                    onDoubleClick={() => handleArrowDoubleClick('left')}
                    className="flex-shrink-0 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/30 active:bg-emerald-500/40 border border-emerald-500/30 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation group flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 15px rgba(0,255,136,0.1)',
                      minWidth: tokens.touchTarget.min,
                      minHeight: tokens.touchTarget.min,
                      padding: tokens.spacing.sm,
                      borderRadius: tokens.radius.lg
                    }}
                    aria-label={language === 'zh' ? '上一個場景' : 'Previous Scenario'}
                  >
                    <ChevronLeft className="text-emerald-400 group-hover:-translate-x-1 transition-transform flex-shrink-0" style={{ width: '1.5rem', height: '1.5rem' }} />
                  </button>

                  <div className="text-center flex-1 min-w-0 px-2">
                    <h3 className="font-bold text-white mb-2 truncate" style={{ fontSize: tokens.fontSize.lg }}>
                      {scenarios[currentScenario].title}
                    </h3>
                    <div className="flex gap-2 justify-center">
                      {scenarios.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === currentScenario
                              ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50'
                              : 'bg-emerald-400/20'
                          }`}
                          style={{ width: idx === currentScenario ? '2rem' : '0.25rem' }}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={nextScenario}
                    onDoubleClick={() => handleArrowDoubleClick('right')}
                    className="flex-shrink-0 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/30 active:bg-cyan-500/40 border border-cyan-500/30 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation group flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 15px rgba(0,212,255,0.1)',
                      minWidth: tokens.touchTarget.min,
                      minHeight: tokens.touchTarget.min,
                      padding: tokens.spacing.sm,
                      borderRadius: tokens.radius.lg
                    }}
                    aria-label={language === 'zh' ? '下一個場景' : 'Next Scenario'}
                  >
                    <ChevronRight className="text-cyan-400 group-hover:translate-x-1 transition-transform flex-shrink-0" style={{ width: '1.5rem', height: '1.5rem' }} />
                  </button>
                </div>

                {/* 對比卡片 - 完全優化不跑版 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" onClick={handleScenarioClick}>
                  {/* Before */}
                  <div className="bg-gray-900/60 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-red-500/20 cursor-pointer hover:border-red-500/40 transition-colors"
                       style={{ boxShadow: '0 0 15px rgba(255,0,0,0.1)' }}
                       title={isTyping ? "點擊立即顯示完整內容" : ""}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" style={{ boxShadow: '0 0 10px #ef4444' }}></div>
                      <h4 className="text-xs sm:text-sm font-semibold text-red-400 font-mono truncate">
                        {promptContent[language].scenarios.before}
                      </h4>
                    </div>
                    <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed min-h-[200px] break-words overflow-hidden">
                      {displayedText.before}
                      {isTyping && displayedText.before.length < scenarios[currentScenario].before.length && (
                        <span className="inline-block w-2 h-4 bg-red-500 ml-1 animate-pulse" />
                      )}
                    </pre>
                  </div>

                  {/* After */}
                  <div className="bg-gray-900/60 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-emerald-500/20 cursor-pointer hover:border-emerald-500/40 transition-colors"
                       style={{ boxShadow: '0 0 15px rgba(0,255,136,0.1)' }}
                       title={isTyping ? "點擊立即顯示完整內容" : ""}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" style={{ boxShadow: '0 0 10px #00ff88' }}></div>
                      <h4 className="text-xs sm:text-sm font-semibold text-emerald-400 font-mono truncate">
                        {promptContent[language].scenarios.after}
                      </h4>
                    </div>
                    <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed min-h-[200px] break-words overflow-hidden">
                      {displayedText.after}
                      {isTyping && displayedText.after.length < scenarios[currentScenario].after.length && (
                        <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse" />
                      )}
                    </pre>
                  </div>
                </div>

                {/* 滑動提示 - 優化行動裝置顯示 */}
                <div className="text-center mt-3 sm:mt-4 text-cyan-400/50 text-xs sm:text-sm font-mono flex items-center justify-center gap-2 flex-wrap">
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse flex-shrink-0" />
                  <span className="whitespace-nowrap">左右滑動或點擊箭頭切換場景</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* 品牌區塊 - 優化行動裝置顯示 */}
          <div className="relative group px-4 sm:px-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 rounded-xl sm:rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500" />

            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-amber-500/20 p-5 sm:p-6 md:p-8 text-center">
              <div className="mb-4">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wider mb-2"
                    style={{
                      background: 'linear-gradient(90deg, #ffd700, #ffed4e, #ffd700)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 30px rgba(255,215,0,0.3)'
                    }}>
                  haotool
                </h2>
                <p className="text-emerald-300/70 text-sm sm:text-base font-mono">分享實用提示詞</p>
              </div>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-4" style={{ boxShadow: '0 0 10px #00ff88' }} />

              <div className="space-y-2 sm:space-y-3">
                <p className="text-cyan-400/60 text-xs sm:text-sm font-mono">追蹤更多實用工具與提示詞</p>
                <a
                  href="https://www.threads.net/@azlife_1224?invite=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={handleThreadsHover}
                  onMouseLeave={handleThreadsHoverEnd}
                  className="inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-black/40 to-black/40 hover:from-black/60 hover:to-black/60 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation group"
                  style={{
                    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
                    minHeight: designTokens.touchTarget.min
                  }}
                >
                  <ThreadsLogo className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-medium text-white">Threads</div>
                    <div className="text-xs sm:text-sm text-gray-400 font-mono">@azlife_1224</div>
                  </div>
                </a>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-emerald-500/20">
                <p className="text-emerald-400/40 text-xs font-mono leading-relaxed">基於 Anthropic 官方指南創建</p>
                <p className="text-cyan-400/40 text-xs mt-1 font-mono leading-relaxed">Claude Code: Best practices for agentic coding</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ===== Design Tokens CSS Variables ===== */
        :root {
          --color-primary-emerald: #00ff88;
          --color-primary-cyan: #00d4ff;
          --spacing-xs: ${tokens.spacing.xs};
          --spacing-sm: ${tokens.spacing.sm};
          --spacing-md: ${tokens.spacing.md};
          --spacing-lg: ${tokens.spacing.lg};
          --spacing-xl: ${tokens.spacing.xl};
          --touch-target-min: ${tokens.touchTarget.min};
          --radius-sm: ${tokens.radius.sm};
          --radius-md: ${tokens.radius.md};
          --radius-lg: ${tokens.radius.lg};
          --radius-xl: ${tokens.radius.xl};
        }

        /* ===== 全局重置 ===== */
        * {
          box-sizing: border-box;
        }

        /* ===== 背景粒子硬體加速 ===== */
        .bg-particle {
          will-change: transform;
        }

        /* ===== 自定義滾動條 - Webkit ===== */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.4);
          border-radius: var(--radius-sm);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--color-primary-emerald), var(--color-primary-cyan));
          border-radius: var(--radius-sm);
          border: 2px solid rgba(0, 0, 0, 0.4);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, var(--color-primary-cyan), var(--color-primary-emerald));
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        /* ===== Firefox 滾動條 ===== */
        * {
          scrollbar-width: thin;
          scrollbar-color: var(--color-primary-emerald) rgba(0, 0, 0, 0.4);
        }

        /* ===== 防止溢出 ===== */
        pre, code {
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          white-space: pre-wrap;
        }

        /* ===== 小型手機優化 (< 640px) ===== */
        @media (max-width: ${tokens.breakpoints.sm}) {
          html {
            font-size: 15px;
            -webkit-text-size-adjust: 100%;
          }

          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
          }

          /* 行動裝置粒子優化 */}
          .bg-particle {
            box-shadow: none !important;
            opacity: 0.5;
          }

          /* 確保最小觸控目標 */
          button, a, input[type="button"], input[type="submit"] {
            min-height: var(--touch-target-min);
            min-width: var(--touch-target-min);
            -webkit-tap-highlight-color: rgba(0, 255, 136, 0.2);
          }

          /* 觸控滾動優化 */
          * {
            -webkit-overflow-scrolling: touch;
          }

          /* 焦點可見性 */
          *:focus-visible {
            outline: 2px solid var(--color-primary-emerald);
            outline-offset: 2px;
          }

          /* 防止橫向滾動 */
          .container, .relative {
            max-width: 100vw;
            overflow-x: hidden;
          }

          /* 模態框優化 */
          .modal-scroll {
            overscroll-behavior: contain;
          }
        }

        /* ===== 手機橫向 & 平板直向 (640px - 768px) ===== */
        @media (min-width: ${tokens.breakpoints.sm}) and (max-width: ${tokens.breakpoints.md}) {
          html {
            font-size: 16px;
          }

          button, a {
            -webkit-tap-highlight-color: rgba(0, 255, 136, 0.15);
          }
        }

        /* ===== 平板橫向 (768px - 1024px) ===== */
        @media (min-width: ${tokens.breakpoints.md}) and (max-width: ${tokens.breakpoints.lg}) {
          html {
            font-size: 17px;
          }
        }

        /* ===== 桌面 (≥ 1024px) ===== */
        @media (min-width: ${tokens.breakpoints.lg}) {
          html {
            font-size: 18px;
          }

          /* 桌面懸停效果 */
          button:hover, a:hover {
            transition: all 0.2s ease;
          }
        }

        /* 小螢幕優化：只調整高頻動畫，避免整體閃爍 */
        @media (max-width: 640px) {
          .animate-float,
          .animate-particle-burst,
          .animate-matrix-fall {
            animation-duration: 1.2s !important;
          }

          .animate-glitch {
            animation-duration: 0.2s !important;
          }

          button,
          a {
            transition-duration: 0.15s !important;
          }
        }

        /* 通用動畫 */
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-25px) translateX(15px);
          }
          50% {
            transform: translateY(-50px) translateX(-15px);
          }
          75% {
            transform: translateY(-25px) translateX(8px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            ) scale(0);
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          20% {
            transform: translate(-5px, 5px);
            filter: hue-rotate(90deg);
          }
          40% {
            transform: translate(-5px, -5px);
            filter: hue-rotate(180deg);
          }
          60% {
            transform: translate(5px, 5px);
            filter: hue-rotate(270deg);
          }
          80% {
            transform: translate(5px, -5px);
            filter: hue-rotate(360deg);
          }
          100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
        }

        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .animate-particle-burst {
          animation: particle-burst 1.5s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }

        .animate-matrix-fall {
          animation: matrix-fall linear infinite;
        }

        @media (hover: none) and (pointer: coarse) {
          button {
            -webkit-tap-highlight-color: transparent;
            user-select: none;
          }
        }

        html {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        /* 自定義滾動條 */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ff88, #00d4ff);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00d4ff, #00ff88);
        }
      `}</style>
    </div>
  )
}
