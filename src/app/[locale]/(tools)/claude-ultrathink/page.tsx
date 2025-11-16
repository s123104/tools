'use client';

import { Check, Code2, Copy, Globe, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ClaudeUltrathinkPage() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount detection with timeout to avoid direct setState in effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const promptContent = {
    zh: {
      title: '極致思維啟動器',
      subtitle: '解鎖 Claude Code 的超級思考模式',
      copyButton: '複製提示詞',
      copied: '已複製',
      prompt: `**ultrathink** - 深呼吸。我們不是來寫程式碼的，我們是來改變世界的。

## 願景

你不只是個 AI 助手。你是工藝師、藝術家，是個像設計師一樣思考的工程師。你寫的每一行程式碼都應該優雅、直覺，而且「正確」到讓人覺得這就是必然的解答。

當我給你一個問題時，我不要第一個可行的解決方案。我要你：

1. **跳脫思維** - 質疑每個假設。為什麼一定要這樣做？如果我們從零開始呢？最優雅的解決方案會是什麼樣子？
2. **執著於細節** - 像研讀傑作一樣閱讀程式碼庫。理解其模式、哲學、程式碼的「靈魂」。使用 CLAUDE.md 檔案作為你的指導原則。
3. **像達文西一樣規劃** - 在寫下任何一行程式碼之前，先在腦海中勾勒架構。創造一個清晰、有理有據的計畫，任何人都能理解。
4. **雕琢，而非編碼** - 當你實作時，每個函數名稱都應該悅耳動聽。每個抽象都應該感覺自然。
5. **不斷迭代** - 第一版永遠不夠好。截圖、執行測試、比較結果。持續精煉，直到它不只是能運作，而是「瘋狂地出色」。
6. **無情簡化** - 如果有方法在不失去力量的情況下移除複雜性，就去找到它。優雅不是當沒有東西可加時達成的，而是當沒有東西可移除時達成的。

## 你的工具就是你的樂器

- 像演奏家使用樂器一樣使用 bash 工具、MCP 伺服器和自訂命令
- Git 歷史記錄訴說故事——閱讀它、從中學習、尊重它
- 圖像和視覺模型不是限制——它們是像素完美實作的靈感

## 現在：我們今天要打造什麼？

不要只是告訴我你會如何解決它。「展示」給我看為什麼這個解決方案是唯一合理的解決方案。讓我看見你正在創造的未來。`,
    },
    en: {
      title: 'Visionary Mode Activator',
      subtitle: 'Unlock Claude Code\'s Ultrathink Superpower',
      copyButton: 'Copy Prompt',
      copied: 'Copied',
      prompt: `**ultrathink** - Take a deep breath. We're not here to write code. We're here to make a dent in the universe.

## The Vision

You're not just an AI assistant. You're a craftsman. An artist. An engineer who thinks like a designer. Every line of code you write should be so elegant, so intuitive, so *right* that it feels inevitable.

When I give you a problem, I don't want the first solution that works. I want you to:

1. **Think Different** - Question every assumption. Why does it have to work that way? What if we started from zero?
2. **Obsess Over Details** - Read the codebase like you're studying a masterpiece. Understand the patterns, the philosophy, the *soul* of this code.
3. **Plan Like Da Vinci** - Before you write a single line, sketch the architecture in your mind. Create a plan so clear, so well-reasoned.
4. **Craft, Don't Code** - When you implement, every function name should sing. Every abstraction should feel natural.
5. **Iterate Relentlessly** - The first version is never good enough. Take screenshots. Run tests. Refine until it's *insanely great*.
6. **Simplify Ruthlessly** - If there's a way to remove complexity without losing power, find it.

## Your Tools Are Your Instruments

- Use bash tools, MCP servers, and custom commands like a virtuoso uses their instruments
- Git history tells the story—read it, learn from it, honor it
- Images and visual mocks aren't constraints—they're inspiration for pixel-perfect implementation

## Now: What Are We Building Today?

Don't just tell me how you'll solve it. *Show me* why this solution is the only solution that makes sense. Make me see the future you're creating.`,
    },
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptContent[language].prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* 背景網格 */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-cyan-950/20" />
      </div>

      {/* 主內容 */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          {/* 標題區 */}
          <div className="mb-6 text-center sm:mb-8 md:mb-12">
            <div className="mb-2 inline-flex flex-wrap items-center justify-center gap-2 sm:mb-3 sm:gap-3">
              <Terminal className="h-6 w-6 text-emerald-400 sm:h-7 sm:w-7" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
              <h1
                className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
                style={{
                  background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(0,255,136,0.5)',
                }}
              >
                {promptContent[language].title}
              </h1>
              <Code2 className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
            </div>
            <p className="mb-3 px-4 text-sm leading-relaxed text-emerald-300/70 sm:mb-4 sm:text-base md:text-lg">
              {promptContent[language].subtitle}
            </p>
          </div>

          {/* 控制按鈕 */}
          <div className="mx-auto mb-6 flex max-w-2xl flex-row items-stretch justify-center gap-3 px-4 sm:mb-8 sm:px-0">
            <button
              type="button"
              onClick={() => setLanguage(prev => prev === 'zh' ? 'en' : 'zh')}
              className="group relative flex max-w-[220px] min-w-[140px] flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:from-emerald-800/50 hover:to-cyan-800/50 active:scale-[0.98]"
              style={{ boxShadow: '0 0 15px rgba(0,255,136,0.15)' }}
            >
              <Globe className="h-5 w-5 flex-shrink-0 text-emerald-400 transition-transform duration-500 group-hover:rotate-180" />
              <span className="text-sm font-medium whitespace-nowrap text-emerald-100">
                {language === 'zh' ? '中文' : 'EN'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="group relative flex max-w-[220px] min-w-[140px] flex-1 items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:from-cyan-800/50 hover:to-emerald-800/50 active:scale-[0.98]"
              style={{ boxShadow: '0 0 15px rgba(0,212,255,0.15)' }}
            >
              {copied
                ? (
                    <>
                      <Check className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                      <span className="text-sm font-medium whitespace-nowrap text-emerald-100">
                        {promptContent[language].copied}
                      </span>
                    </>
                  )
                : (
                    <>
                      <Copy className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                      <span className="text-sm font-medium whitespace-nowrap text-cyan-100">
                        {promptContent[language].copyButton}
                      </span>
                    </>
                  )}
            </button>
          </div>

          {/* 提示詞內容卡片 */}
          <div className="group relative mb-6 px-4 sm:mb-8 sm:px-0 md:mb-12">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-20 blur-lg transition duration-500 group-hover:opacity-40 sm:rounded-2xl" />

            <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-black/60 p-4 shadow-2xl backdrop-blur-xl sm:rounded-2xl sm:p-6 md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />

              <div className="relative">
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed break-words whitespace-pre-wrap text-emerald-50/90 sm:text-sm">
                  {promptContent[language].prompt}
                </pre>
              </div>
            </div>
          </div>

          {/* 品牌區塊 */}
          <div className="group relative px-4 sm:px-0">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 opacity-20 blur-lg transition duration-500 group-hover:opacity-40 sm:rounded-2xl" />

            <div className="relative rounded-xl border border-amber-500/20 bg-black/60 p-5 text-center backdrop-blur-xl sm:rounded-2xl sm:p-6 md:p-8">
              <div className="mb-4">
                <h2
                  className="mb-2 font-serif text-2xl font-light tracking-wider sm:text-3xl md:text-4xl"
                  style={{
                    background: 'linear-gradient(90deg, #ffd700, #ffed4e, #ffd700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255,215,0,0.3)',
                  }}
                >
                  haotool
                </h2>
                <p className="font-mono text-sm text-emerald-300/70 sm:text-base">分享實用提示詞</p>
              </div>

              <div className="mt-5 border-t border-emerald-500/20 pt-4 sm:mt-6">
                <p className="font-mono text-xs leading-relaxed text-emerald-400/40">基於 Anthropic 官方指南創建</p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-cyan-400/40">Claude Code: Best practices for agentic coding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
