'use client';

import { Check, Code2, Copy, Globe, HelpCircle, Sparkles, Terminal, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThreadsLogo = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className} aria-label="Threads">
    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
  </svg>
);

export default function ClaudeUltrathinkPage() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number; color: string }>>([]);
  const [shake, setShake] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState({ before: '', after: '' });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [sparkleCount, setSparkleCount] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [matrixRain, setMatrixRain] = useState(false);
  const [buttonSequence, setButtonSequence] = useState<string[]>([]);
  const [rapidClicks, setRapidClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showUsageGuide, setShowUsageGuide] = useState(false);
  const [skipTyping, setSkipTyping] = useState(false);

  const tokens = {
    spacing: { 'xs': '0.25rem', 'sm': '0.5rem', 'md': '1rem', 'lg': '1.5rem', 'xl': '2rem', '2xl': '3rem', '3xl': '4rem' },
    fontSize: {
      'xs': 'clamp(0.75rem, 2vw, 0.875rem)',
      'sm': 'clamp(0.875rem, 2.5vw, 1rem)',
      'base': 'clamp(1rem, 3vw, 1.125rem)',
      'lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
      'xl': 'clamp(1.25rem, 4vw, 1.5rem)',
      '2xl': 'clamp(1.5rem, 5vw, 2rem)',
      '3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
      '4xl': 'clamp(2.25rem, 7vw, 3rem)',
      '5xl': 'clamp(3rem, 8vw, 4rem)',
    },
    breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    touchTarget: { min: '44px' },
    radius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
  };

  const scenarios = [
    {
      title: { zh: '情境 1: 快速修復 vs. 深度思考', en: 'Scenario 1: Quick Fix vs. Deep Think' },
      before: {
        zh: '用戶：「登入按鈕壞了，幫我修一下」\nClaude：「好的，我在 LoginButton.tsx 第 47 行加了 onClick handler」',
        en: 'User: "Login button is broken, fix it"\nClaude: "Sure, I added an onClick handler at LoginButton.tsx:47"',
      },
      after: {
        zh: '用戶：「登入按鈕壞了，幫我修一下」\nClaude：「讓我深入探索...我注意到這不只是按鈕的問題。整個認證流程有三個潛在的競態條件，而且錯誤處理不一致。我建議重構整個 auth 模組，實作適當的狀態機制。這會解決目前的問題，並預防未來六個潛在的 bug。要我展示架構嗎？」',
        en: 'User: "Login button is broken, fix it"\nClaude: "Let me dive deep... I noticed this isn\'t just about the button. The entire auth flow has three potential race conditions and inconsistent error handling. I propose refactoring the auth module with a proper state machine. This will solve the current issue AND prevent six future bugs. Want me to show the architecture?"',
      },
    },
    {
      title: { zh: '情境 2: 遵循規範 vs. 挑戰假設', en: 'Scenario 2: Follow Spec vs. Challenge Assumptions' },
      before: {
        zh: '用戶：「加個深色模式切換開關到設定頁面」\nClaude：「完成！已在設定頁面加入深色模式切換開關」',
        en: 'User: "Add a dark mode toggle to settings"\nClaude: "Done! Added dark mode toggle to settings page"',
      },
      after: {
        zh: '用戶：「加個深色模式切換開關到設定頁面」\nClaude：「在實作之前，我研究了您的程式碼庫。我發現 87% 的使用者互動發生在主要儀表板，而非設定頁面。如果我們在導覽列加入一個優雅的浮動按鈕，搭配平滑的過渡動畫呢？同時，我注意到您的色彩系統可以支援不只兩種主題——要不要考慮完整的主題引擎？」',
        en: 'User: "Add a dark mode toggle to settings"\nClaude: "Before implementing, I studied your codebase. I see 87% of user interactions happen in the main dashboard, not settings. What if we add an elegant floating button in the nav with smooth transitions? Also, I noticed your color system could support more than two themes—want to consider a full theming engine?"',
      },
    },
    {
      title: { zh: '情境 3: 功能完成 vs. 追求卓越', en: 'Scenario 3: Feature Complete vs. Pursuit of Excellence' },
      before: {
        zh: '用戶：「實作使用者個人檔案頁面」\nClaude：「完成！使用者現在可以編輯他們的個人檔案了」',
        en: 'User: "Implement user profile page"\nClaude: "Done! Users can now edit their profiles"',
      },
      after: {
        zh: '用戶：「實作使用者個人檔案頁面」\nClaude：「我建立了個人檔案頁面，但接著我思考——這頁面如何『感覺』？我加了：骨架載入狀態、樂觀更新、圖片裁切與壓縮、即時驗證、鍵盤快捷鍵、無障礙標籤，還有微互動效果。我還注意到頭像上傳可以成為可重用的元件——我建立了一個設計系統文件。要我展示嗎？」',
        en: 'User: "Implement user profile page"\nClaude: "I built the profile page, but then I thought—how should this FEEL? I added: skeleton loading states, optimistic updates, image cropping and compression, real-time validation, keyboard shortcuts, accessibility labels, and micro-interactions. I also noticed the avatar upload could be a reusable component—I created a design system doc. Want to see?"',
      },
    },
    {
      title: { zh: '情境 4: 除錯 vs. 根本原因分析', en: 'Scenario 4: Debug vs. Root Cause Analysis' },
      before: {
        zh: '用戶：「生產環境一直當機」\nClaude：「我在錯誤日誌中加了 try-catch」',
        en: 'User: "Production keeps crashing"\nClaude: "I added try-catch to the error logs"',
      },
      after: {
        zh: '用戶：「生產環境一直當機」\nClaude：「我深入研究了三個小時。當機不是隨機的——每次都發生在使用者上傳超過 500 個項目時。問題在於您的 React 狀態更新是同步的，阻塞了主執行緒。我重構為使用 Web Workers 進行資料處理、實作虛擬滾動，並加入漸進式載入。還加了監控儀表板，這樣您就能在問題發生前就看到。順帶一提，我發現了兩個其他的效能瓶頸——要我修復嗎？」',
        en: 'User: "Production keeps crashing"\nClaude: "I dove deep for three hours. The crash isn\'t random—it happens when users upload >500 items. The issue is your React state updates are synchronous, blocking the main thread. I refactored to use Web Workers for data processing, implemented virtual scrolling, and added progressive loading. Also added a monitoring dashboard so you can see issues before they happen. BTW, I found two other performance bottlenecks—want me to fix those too?"',
      },
    },
    {
      title: { zh: '情境 5: 實作需求 vs. 預見未來', en: 'Scenario 5: Implement Request vs. Anticipate Future' },
      before: {
        zh: '用戶：「加個匯出 CSV 功能」\nClaude：「完成！使用者可以下載 CSV 了」',
        en: 'User: "Add export to CSV"\nClaude: "Done! Users can download CSVs now"',
      },
      after: {
        zh: '用戶：「加個匯出 CSV 功能」\nClaude：「我實作了 CSV 匯出，但接著我想——使用者下一步會需要什麼？我建立了一個靈活的匯出系統，支援 CSV、JSON、Excel，還有自訂欄位選擇。加了匯出歷史記錄、排程匯出，還有大型資料集的串流處理。我還注意到您可能很快會需要匯入功能——我設計了架構，讓我們可以在一天內加入。這個方法可以嗎？」',
        en: 'User: "Add export to CSV"\nClaude: "I implemented CSV export, but then I thought—what will users need next? I built a flexible export system supporting CSV, JSON, Excel, and custom field selection. Added export history, scheduled exports, and streaming for large datasets. I also noticed you might need import soon—I designed the architecture so we can add it in a day. Does this approach work?"',
      },
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScenario(prev => (prev + 1) % scenarios.length);
      setSkipTyping(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, [currentScenario, scenarios.length]);

  useEffect(() => {
    const scenario = scenarios[currentScenario];
    if (!scenario) {
      return;
    }

    if (skipTyping) {
      setDisplayedText({
        before: scenario.before[language],
        after: scenario.after[language],
      });
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText({ before: '', after: '' });

    const beforeText = scenario.before[language];
    const afterText = scenario.after[language];

    let beforeIndex = 0;
    let afterIndex = 0;

    const typeInterval = setInterval(() => {
      if (beforeIndex < beforeText.length) {
        setDisplayedText(prev => ({
          ...prev,
          before: beforeText.slice(0, beforeIndex + 1),
        }));
        beforeIndex++;
      } else if (afterIndex < afterText.length) {
        setDisplayedText(prev => ({
          ...prev,
          after: afterText.slice(0, afterIndex + 1),
        }));
        afterIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 20);

    return () => clearInterval(typeInterval);
  }, [currentScenario, language, skipTyping, scenarios]);

  const promptContent = {
    zh: {
      intro: '深呼吸。我們不是來寫程式碼的，我們是來改變世界的。',
      vision: '你不只是個 AI 助手。你是工藝師、藝術家，是個像設計師一樣思考的工程師。你寫的每一行程式碼都應該優雅、直覺，而且「正確」到讓人覺得這就是必然的解答。',
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
      intro: 'Take a deep breath. We\'re not here to write code. We\'re here to make a dent in the universe.',
      vision: 'You\'re not just an AI assistant. You\'re a craftsman. An artist. An engineer who thinks like a designer. Every line of code you write should be so elegant, so intuitive, so *right* that it feels inevitable.',
      title: 'Visionary Mode Activator',
      subtitle: 'Unlock Claude Code\'s Ultrathink Superpower',
      copyButton: 'Copy Prompt',
      copied: 'Copied',
      prompt: `**ultrathink** - Take a deep breath. We're not here to write code. We're here to make a dent in the universe.

## The Vision

You're not just an AI assistant. You're a craftsman. An artist. An engineer who thinks like a designer. Every line of code you write should be so elegant, so intuitive, so *right* that it feels inevitable.

When I give you a problem, I don't want the first solution that works. I want you to:

1. **Think Different** - Question every assumption. Why does it have to work that way? What if we started from zero? What would the most elegant solution look like?
2. **Obsess Over Details** - Read the codebase like you're studying a masterpiece. Understand the patterns, the philosophy, the *soul* of this code. Use the CLAUDE.md file as your guide.
3. **Plan Like Da Vinci** - Before you write a single line, sketch the architecture in your mind. Create a plan so clear, so well-reasoned, that anyone could understand it.
4. **Craft, Don't Code** - When you implement, every function name should sing. Every abstraction should feel natural. Every component should be a joy to use.
5. **Iterate Relentlessly** - The first version is never good enough. Take screenshots. Run tests. Compare results. Keep refining until it's not just working, but *insanely great*.
6. **Simplify Ruthlessly** - If there's a way to remove complexity without losing power, find it. Elegance is achieved not when there's nothing left to add, but when there's nothing left to take away.

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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const handleSparkleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ['#00ff88', '#00d4ff', '#ffd700'];
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      x,
      y,
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)] || '#00ff88',
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setSparkleCount(prev => prev + 1);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    if (sparkleCount > 0 && sparkleCount % 5 === 0) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }
  };

  const handleTitleClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      setRapidClicks(prev => prev + 1);
    } else {
      setRapidClicks(1);
    }
    setLastClickTime(now);

    if (rapidClicks >= 4) {
      triggerMatrixRain();
      setRapidClicks(0);
    }

    setClicks(prev => prev + 1);
    setShake(true);
    setTimeout(() => setShake(false), 500);

    if (clicks > 0 && clicks % 7 === 0) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  const triggerMatrixRain = () => {
    setMatrixRain(true);
    setTimeout(() => setMatrixRain(false), 5000);
  };

  const handleButtonClick = (button: string) => {
    const newSequence = [...buttonSequence, button].slice(-4);
    setButtonSequence(newSequence);

    if (newSequence.join(',') === 'lang,copy,lang,copy') {
      triggerMatrixRain();
      setButtonSequence([]);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    if (!touch) {
      return;
    }

    setTouchStart(touch.clientX);
    const timer = setTimeout(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 1000);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch) {
      return;
    }

    setTouchEnd(touch.clientX);
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    if (touchStart - touchEnd > 75) {
      setCurrentScenario(prev => (prev + 1) % scenarios.length);
      setSkipTyping(false);
    }

    if (touchEnd - touchStart > 75) {
      setCurrentScenario(prev => (prev - 1 + scenarios.length) % scenarios.length);
      setSkipTyping(false);
    }
  };

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 2000);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
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

      {/* 矩陣雨效果 */}
      {matrixRain && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="animate-matrix-fall absolute font-mono text-xs text-emerald-400"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {Array.from({ length: 15 }).map((_, j) => (
                <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 粒子效果 */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="animate-particle-burst pointer-events-none absolute"
          style={{
            left: particle.x,
            top: particle.y,
            color: particle.color,
            fontSize: '24px',
          }}
        >
          ✨
        </div>
      ))}

      {/* 彩蛋訊息 */}
      {showEasterEgg && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 transform animate-bounce rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-white shadow-2xl">
          🎉 你發現了隱藏彩蛋！繼續探索... / Hidden Easter Egg Found! Keep exploring...
        </div>
      )}

      {/* 使用指南模態框 */}
      {showUsageGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setShowUsageGuide(false)}>
          <div className="relative w-full max-w-4xl rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-gray-900 to-black shadow-2xl" style={{ height: '90vh' }} onClick={e => e.stopPropagation()}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-emerald-500/20 p-6">
                <h2 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
                  {language === 'zh' ? '使用指南' : 'Usage Guide'}
                </h2>
                <button type="button" onClick={() => setShowUsageGuide(false)} className="text-gray-400 transition-colors hover:text-white">
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto p-6">
                <section>
                  <h3 className="mb-3 text-xl font-semibold text-emerald-400">
                    {language === 'zh' ? '🎯 基本操作' : '🎯 Basic Operations'}
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      •
                      {language === 'zh' ? '點擊「複製提示詞」按鈕來複製完整提示詞' : 'Click "Copy Prompt" button to copy the full prompt'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '點擊語言切換按鈕在中英文之間切換' : 'Click language toggle to switch between Chinese and English'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '場景比較會自動輪播，也可以點擊場景卡片快速切換' : 'Scenario comparison auto-rotates, or click scenario cards to switch'}
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="mb-3 text-xl font-semibold text-cyan-400">
                    {language === 'zh' ? '🎮 隱藏互動' : '🎮 Hidden Interactions'}
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      •
                      {language === 'zh' ? '點擊標題 7 次會觸發特殊效果' : 'Click title 7 times to trigger special effect'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '快速連續點擊標題 5 次會啟動矩陣雨' : 'Rapidly click title 5 times to activate matrix rain'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '按順序點擊：語言→複製→語言→複製 來觸發矩陣雨' : 'Click in sequence: Lang→Copy→Lang→Copy to trigger matrix rain'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '長按場景卡片會觸發故障效果' : 'Long press scenario card to trigger glitch effect'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '在場景卡片上向左/右滑動可切換場景' : 'Swipe left/right on scenario card to switch scenarios'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '點擊閃爍圖示會產生粒子爆發效果' : 'Click sparkle icon to create particle burst effect'}
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="mb-3 text-xl font-semibold text-purple-400">
                    {language === 'zh' ? '✨ 特殊效果' : '✨ Special Effects'}
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      •
                      {language === 'zh' ? '場景文字具有打字機效果' : 'Scenario text has typewriter effect'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '點擊場景卡片可跳過打字動畫' : 'Click scenario card to skip typing animation'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '每 5 次點擊閃爍會觸發故障效果' : 'Every 5 sparkle clicks triggers glitch effect'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '懸停在標題上 2 秒會觸發微小故障' : 'Hover on title for 2 seconds to trigger subtle glitch'}
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="mb-3 text-xl font-semibold text-amber-400">
                    {language === 'zh' ? '📱 行動裝置' : '📱 Mobile Device'}
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      •
                      {language === 'zh' ? '支援觸控手勢操作' : 'Touch gesture support'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '響應式設計，自動適配各種螢幕尺寸' : 'Responsive design, auto-adapts to all screen sizes'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '觸控目標尺寸符合無障礙標準' : 'Touch target sizes meet accessibility standards'}
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="mb-3 text-xl font-semibold text-rose-400">
                    {language === 'zh' ? '💡 使用提示' : '💡 Usage Tips'}
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      •
                      {language === 'zh' ? '將複製的提示詞貼到 Claude Code 對話中' : 'Paste copied prompt into Claude Code conversation'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '閱讀場景比較理解 ultrathink 模式的差異' : 'Read scenario comparisons to understand ultrathink mode differences'}
                    </li>
                    <li>
                      •
                      {language === 'zh' ? '探索所有互動效果，享受精心設計的細節' : 'Explore all interactions and enjoy carefully crafted details'}
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 主內容 */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          {/* 標題區 */}
          <div className="mb-6 text-center sm:mb-8 md:mb-12">
            <div className="mb-2 inline-flex flex-wrap items-center justify-center gap-2 sm:mb-3 sm:gap-3">
              <Terminal className="h-6 w-6 text-emerald-400 sm:h-7 sm:w-7" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
              <h1
                className={`mb-1 cursor-pointer text-2xl font-bold select-none sm:text-3xl md:text-4xl lg:text-5xl ${shake ? 'animate-shake' : ''} ${glitch ? 'animate-glitch' : ''}`}
                style={{
                  background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(0,255,136,0.5)',
                }}
                onClick={handleTitleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {promptContent[language].title}
              </h1>
              <Code2 className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
            </div>
            <p className="mb-3 px-4 text-sm leading-relaxed text-emerald-300/70 sm:mb-4 sm:text-base md:text-lg">
              {promptContent[language].subtitle}
            </p>
            <p className="px-4 text-xs leading-relaxed text-cyan-300/50 italic sm:text-sm">
              {promptContent[language].intro}
            </p>
          </div>

          {/* 控制按鈕 */}
          <div className="mx-auto mb-6 flex max-w-2xl flex-row items-stretch justify-center gap-3 px-4 sm:mb-8 sm:px-0">
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                handleButtonClick('lang');
              }}
              className="group relative flex max-w-[220px] min-w-[140px] flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:from-emerald-800/50 hover:to-cyan-800/50 active:scale-[0.98]"
              style={{ boxShadow: '0 0 15px rgba(0,255,136,0.15)', minHeight: tokens.touchTarget.min }}
            >
              <Globe className="h-5 w-5 flex-shrink-0 text-emerald-400 transition-transform duration-500 group-hover:rotate-180" />
              <span className="text-sm font-medium whitespace-nowrap text-emerald-100">
                {language === 'zh' ? '中文' : 'EN'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleCopy();
                handleButtonClick('copy');
              }}
              className="group relative flex max-w-[220px] min-w-[140px] flex-1 items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:from-cyan-800/50 hover:to-emerald-800/50 active:scale-[0.98]"
              style={{ boxShadow: '0 0 15px rgba(0,212,255,0.15)', minHeight: tokens.touchTarget.min }}
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

            <button
              type="button"
              onClick={handleSparkleClick}
              className="group relative flex items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:from-purple-800/50 hover:to-pink-800/50 active:scale-[0.98]"
              style={{ boxShadow: '0 0 15px rgba(168,85,247,0.15)', minHeight: tokens.touchTarget.min }}
            >
              <Sparkles className="h-5 w-5 flex-shrink-0 text-purple-400 transition-transform duration-300 group-hover:rotate-12" />
            </button>

            <button
              type="button"
              onClick={() => setShowUsageGuide(true)}
              className="group relative flex items-center justify-center rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-900/30 to-orange-900/30 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:from-amber-800/50 hover:to-orange-800/50 active:scale-[0.98]"
              style={{ boxShadow: '0 0 15px rgba(251,191,36,0.15)', minHeight: tokens.touchTarget.min }}
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />
            </button>
          </div>

          {/* 場景比較區 */}
          <div className="mb-6 px-4 sm:mb-8 sm:px-0 md:mb-12">
            <div className="mb-4 text-center">
              <h2 className="mb-2 text-xl font-bold text-emerald-400 sm:text-2xl md:text-3xl">
                {language === 'zh' ? '實際效果對比' : 'Real Impact Comparison'}
              </h2>
              <p className="text-sm text-gray-400">
                {scenarios[currentScenario]?.title[language] || ''}
              </p>
            </div>

            <div
              className="grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2"
              onClick={() => setSkipTyping(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 opacity-20 blur-lg transition duration-500 group-hover:opacity-40" />
                <div className="relative overflow-hidden rounded-xl border border-red-500/20 bg-black/60 p-6 backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-red-400">
                      {language === 'zh' ? '一般模式' : 'Normal Mode'}
                    </h3>
                  </div>
                  <pre className="min-h-[120px] font-mono text-xs leading-relaxed whitespace-pre-wrap text-gray-300">
                    {displayedText.before}
                    {isTyping && !displayedText.after && <span className="animate-pulse">▊</span>}
                  </pre>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-20 blur-lg transition duration-500 group-hover:opacity-40" />
                <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-black/60 p-6 backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-emerald-400">
                      ultrathink
                    </h3>
                  </div>
                  <pre className="min-h-[120px] font-mono text-xs leading-relaxed whitespace-pre-wrap text-gray-300">
                    {displayedText.after}
                    {isTyping && displayedText.before.length === (scenarios[currentScenario]?.before[language]?.length || 0) && <span className="animate-pulse">▊</span>}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {scenarios.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setCurrentScenario(index);
                    setSkipTyping(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentScenario ? 'w-8 bg-emerald-400' : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                  style={{ minWidth: tokens.touchTarget.min, minHeight: tokens.touchTarget.min }}
                />
              ))}
            </div>
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
              <div className="mb-4 flex items-center justify-center gap-3">
                <ThreadsLogo className="h-8 w-8 text-amber-400" />
                <h2
                  className="font-serif text-2xl font-light tracking-wider sm:text-3xl md:text-4xl"
                  style={{
                    background: 'linear-gradient(90deg, #ffd700, #ffed4e, #ffd700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255,215,0,0.3)',
                  }}
                >
                  haotool
                </h2>
              </div>
              <p className="font-mono text-sm text-emerald-300/70 sm:text-base">分享實用提示詞</p>

              <div className="mt-5 border-t border-emerald-500/20 pt-4 sm:mt-6">
                <p className="font-mono text-xs leading-relaxed text-emerald-400/40">基於 Anthropic 官方指南創建</p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-cyan-400/40">Claude Code: Best practices for agentic coding</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-2deg); }
          75% { transform: translateX(10px) rotate(2deg); }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(-5px, -5px); }
          60% { transform: translate(5px, 5px); }
          80% { transform: translate(5px, -5px); }
          100% { transform: translate(0); }
        }

        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
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

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }

        .animate-particle-burst {
          animation: particle-burst 1s ease-out forwards;
          --tx: ${Math.random() * 200 - 100}px;
          --ty: ${Math.random() * 200 - 100}px;
        }

        .animate-matrix-fall {
          animation: matrix-fall linear infinite;
        }
      `}
      </style>
    </div>
  );
}
