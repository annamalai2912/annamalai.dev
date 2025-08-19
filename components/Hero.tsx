'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [showPressStart, setShowPressStart] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lazy-init audio so some browsers allow playback after user gesture
    if (!audioRef.current) {
      const a = new Audio('/sounds/start.wav'); // put a file at public/sounds/start.wav
      a.preload = 'auto';
      audioRef.current = a;
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleStart = () => {
    if (gameStarted) return;
    try { audioRef.current?.play?.(); } catch {}
    setGameStarted(true);
    setShowPressStart(false);
    // fake loading progress
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.max(1, Math.round(Math.random() * 7)));
        if (next >= 100) clearInterval(id);
        return next;
      });
    }, 100);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white">
      {/* Background gradient + starfield */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,170,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-40 animate-twinkle bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25)_1px,transparent_1px),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.18)_1px,transparent_1px),radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[length:1200px_1200px,900px_900px,600px_600px]" />
        {/* CRT scanlines + vignette */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-35 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:100%_4px] animate-scanlines" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.9)]" />
      </div>

      <div className="relative text-center max-w-4xl px-4">
        <AnimatePresence mode="wait">
          {!gameStarted && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -2 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 180 }}
                className="p-8 bg-black/40 backdrop-blur-[1px] border border-emerald-400/40 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.25)] pixel-card"
              >
                <motion.pre
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="pixel-font text-[6px] md:text-[10px] leading-none glow-text-emerald mb-6 text-center"
>
 {`
     █████╗ ███╗   ██╗███╗   ██╗ █████╗ ███╗   ███╗ █████╗ ██╗      █████╗ ██╗    ██████╗ ███████╗██╗   ██╗
    ██╔══██╗████╗  ██║████╗  ██║██╔══██╗████╗ ████║██╔══██╗██║     ██╔══██╗██║    ██╔══██╗██╔════╝██║   ██║
    ███████║██╔██╗ ██║██╔██╗ ██║███████║██╔████╔██║███████║██║     ███████║██║    ██║  ██║█████╗  ██║   ██║
    ██╔══██║██║╚██╗██║██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══██║██║     ██╔══██║██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝
    ██║  ██║██║ ╚████║██║ ╚████║██║  ██║██║ ╚═╝ ██║██║  ██║███████╗██║  ██║██║ ██╗██████╔╝███████╗ ╚████╔╝ 
    ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝ ╚═╝╚═════╝ ╚══════╝  ╚═══╝  
        `}
</motion.pre>
                <p className="mono-font text-xl md:text-2xl text-emerald-300/95">
                  &gt; Deep&nbsp;Learning&nbsp;Engineer_
                  &gt; TechKnots
                </p>
              </motion.div>

              {/* ASCII console boot */}
              <motion.pre
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mono-font text-left text-sm md:text-base leading-6 text-emerald-300/90 bg-black/30 border border-emerald-400/20 rounded-xl p-4 overflow-x-auto"
              >
{`$ boot an.dev --fast
> probing devices.... ok
> loading kernel........ ok
> mounting /skills ...... ok
> status: READY
`}
              </motion.pre>

              {showPressStart && (
                <motion.button
                  type="button"
                  onClick={handleStart}
                  className="inline-flex items-center gap-3 mx-auto px-6 py-3 rounded-2xl border border-emerald-400/50 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-black animate-pulse-fast shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                >
                  <span className="pixel-font text-lg glow-text-emerald">PRESS START TO ENTER</span>
                  <kbd className="kbd">SPACE</kbd>
                  <span className="opacity-60">or</span>
                  <kbd className="kbd">ENTER</kbd>
                </motion.button>
              )}
              <p className="mono-font text-xs text-emerald-200/70">(You can also click the button)</p>
            </motion.div>
          )}

          {gameStarted && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="typewriter pixel-font text-2xl md:text-4xl text-emerald-200 glow-text-emerald">
                LOADING PORTFOLIO...
              </div>

              {/* Progress Bar */}
              <div className="mx-auto w-full max-w-xl">
                <div className="h-3 rounded-xl border border-emerald-400/70 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  <motion.div
                    className="h-full bg-emerald-400/90"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                  />
                </div>
                <div className="mt-2 mono-font text-emerald-200/80 text-sm">
                  SYSTEM READY {progress < 100 ? `— ${progress}%` : '— 100%'}
                </div>
              </div>

              {/* Quick action hints */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mono-font text-emerald-200/80 text-base"
              >
                SYSTEM READY — SCROLL DOWN TO CONTINUE
              </motion.div>

              {/* Retro menu stubs you can hook up later */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
              >
                {[
                  { label: 'START', sub: 'Enter Portfolio', hotkey: 'S' },
                  { label: 'PROFILE', sub: 'About Me', hotkey: 'P' },
                  { label: 'REPO SYNC', sub: 'GitHub Import', hotkey: 'R' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="group relative p-4 rounded-2xl border border-emerald-400/40 bg-black/30 hover:bg-black/40 transition shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    onClick={() => console.log(`${item.label} clicked`)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="pixel-font text-emerald-200 text-lg tracking-wide group-hover:translate-x-0.5 transition-transform">
                        {item.label}
                      </span>
                      <kbd className="kbd">{item.hotkey}</kbd>
                    </div>
                    <div className="mono-font text-emerald-200/70 text-xs mt-1">{item.sub}</div>
                    <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-emerald-400/30 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Pixel Character or Avatar */}
      <motion.div
        className="fixed bottom-6 right-6 w-14 h-14 opacity-80"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Replace with your own image at /avatar.png for pixel look */}
        <div className="w-full h-full rounded-2xl border border-emerald-400/40 bg-emerald-400/10 backdrop-blur-[1px]" />
      </motion.div>

      {/* Local styles for special effects (no Tailwind plugin needed) */}
      <style jsx global>{`
        Glow text helpers 
        .glow-text-emerald { text-shadow: 0 0 8px rgba(16,185,129,0.75), 0 0 20px rgba(16,185,129,0.35); }
        .pixel-font { font-family: 'Press Start 2P', system-ui, ui-monospace, monospace; }
        .mono-font { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }

        /* Typewriter effect */
        .typewriter { overflow: hidden; white-space: nowrap; border-right: .15em solid rgba(16,185,129,0.9); animation: typing 2.6s steps(22,end), blink .8s step-end infinite; }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink { 0%,100% { border-color: transparent } 50% { border-color: rgba(16,185,129,0.9) } }

        /* Scanlines & twinkle */
        @keyframes scanlines { from { transform: translateY(0); } to { transform: translateY(4px); } }
        .animate-scanlines { animation: scanlines .12s linear infinite; }
        @keyframes twinkle { 0%,100% { opacity: .25 } 50% { opacity: .4 } }
        .animate-twinkle { animation: twinkle 4s ease-in-out infinite; }

        /* Press Start pulse */
        @keyframes pulseFast { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        .animate-pulse-fast { animation: pulseFast 1.1s ease-in-out infinite; }

        /* Cute kbd chip */
        .kbd { font-family: ui-monospace, monospace; font-size: .75rem; padding: .15rem .45rem; border-radius: .5rem; border: 1px solid rgba(16,185,129,.6); background: rgba(16,185,129,.08); color: rgba(209,250,229,1); }

        /* Optional pixel-card border effect */
        .pixel-card { position: relative; }
        .pixel-card:before { content: ''; position: absolute; inset: -2px; border: 2px solid rgba(16,185,129,0.35); filter: drop-shadow(0 0 10px rgba(16,185,129,0.25)); border-radius: 1.25rem; pointer-events: none; }
      `}</style>
    </section>
  );
}
