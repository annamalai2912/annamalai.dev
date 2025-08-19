'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [showPressStart, setShowPressStart] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        setGameStarted(true);
        setShowPressStart(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center crt-screen relative">
      <div className="text-center max-w-4xl px-4">
        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="ascii-border p-8 bg-current bg-opacity-10"
            >
              <h1 className="pixel-font text-4xl md:text-6xl glow-text mb-4">
                ANNAMALAI.DEV
              </h1>
              <p className="mono-font text-xl md:text-2xl mb-8">
                &gt; Full Stack Developer_
              </p>
            </motion.div>
            
            {showPressStart && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="cursor-pointer"
                onClick={() => {
                  setGameStarted(true);
                  setShowPressStart(false);
                }}
              >
                <p className="pixel-font text-lg glow-text">
                  PRESS START TO ENTER
                </p>
                <p className="mono-font text-sm mt-2 opacity-70">
                  [SPACE] or [ENTER] or click here
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="typewriter pixel-font text-2xl md:text-4xl glow-text">
              LOADING PORTFOLIO...
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 2 }}
              className="h-2 border-2 border-current mx-auto max-w-md"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="h-full bg-current skill-bar"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="mono-font text-lg"
            >
              SYSTEM READY - SCROLL DOWN TO CONTINUE
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Floating Pixel Character */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 opacity-50"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-full h-full pixel-border bg-current bg-opacity-20" />
      </motion.div>
    </section>
  );
}