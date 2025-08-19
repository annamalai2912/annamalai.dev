'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setSequence(prev => {
        const newSequence = [...prev, event.code].slice(-KONAMI_CODE.length);
        
        if (newSequence.length === KONAMI_CODE.length && 
            newSequence.every((key, index) => key === KONAMI_CODE[index])) {
          setShowSecret(true);
          setTimeout(() => setShowSecret(false), 5000);
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {showSecret && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        >
          <div className="ascii-border p-8 bg-current text-white max-w-md text-center">
            <h2 className="pixel-font text-2xl glow-text mb-4">
              🎉 SECRET UNLOCKED! 🎉
            </h2>
            <div className="mono-font text-lg mb-4">
              CONGRATULATIONS, FELLOW GAMER!
            </div>
            <div className="text-sm mono-font opacity-80">
              You found the hidden easter egg! 
              This proves you have the true spirit of exploration.
            </div>
            <div className="mt-4 pixel-font text-xs">
              +9999 XP BONUS
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}