'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isTerminal, setIsTerminal] = useState(false);

  useEffect(() => {
    if (isTerminal) {
      document.body.classList.add('terminal-theme');
    } else {
      document.body.classList.remove('terminal-theme');
    }
  }, [isTerminal]);

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <button
        onClick={() => setIsTerminal(!isTerminal)}
        className="pixel-button px-4 py-2 text-xs pixel-font glow-text"
        title={isTerminal ? "Switch to Game Boy Theme" : "Switch to Terminal Theme"}
      >
        {isTerminal ? '🎮 GAMEBOY' : '💻 TERMINAL'}
      </button>
    </motion.div>
  );
}