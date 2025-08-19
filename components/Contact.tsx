'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [currentCommand, setCurrentCommand] = useState('');

  const contacts = [
    { label: 'Email', value: 'annamalai@example.com', command: 'mail' },
    { label: 'GitHub', value: 'github.com/annamalai2912', command: 'git' },
    { label: 'LinkedIn', value: 'linkedin.com/in/annamalai', command: 'link' },
  ];

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="pixel-font text-3xl md:text-5xl glow-text mb-4">
            CONNECT
          </h2>
          <div className="w-24 h-1 bg-current mx-auto skill-bar" />
        </motion.div>

        <div className="ascii-border p-8 bg-current bg-opacity-5">
          <div className="mb-6">
            <div className="mono-font text-sm opacity-80 mb-2">
              TERMINAL v1.0.0 - Ready for connections
            </div>
            <div className="mono-font text-sm">
              &gt; Type a command or click the links below
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.command}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border border-current border-opacity-30 hover:border-opacity-70 transition-all cursor-pointer"
                onClick={() => {
                  if (contact.command === 'mail') {
                    window.location.href = `mailto:${contact.value}`;
                  } else if (contact.command === 'git') {
                    window.open(`https://${contact.value}`, '_blank');
                  } else if (contact.command === 'link') {
                    window.open(`https://${contact.value}`, '_blank');
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="pixel-font text-xs glow-text">
                    {contact.command}
                  </span>
                  <span className="mono-font text-sm">
                    {contact.label}
                  </span>
                </div>
                <span className="mono-font text-sm opacity-70">
                  {contact.value}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-current border-opacity-30 pt-6">
            <div className="flex items-center gap-2 mono-font text-sm">
              <span>&gt;</span>
              <span>{currentCommand}</span>
              <span className="blink">█</span>
            </div>
          </div>
        </div>

        {/* Easter Egg Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="pixel-border p-4 bg-current bg-opacity-5 inline-block">
            <p className="pixel-font text-xs glow-text mb-2">
              SECRET UNLOCKED!
            </p>
            <p className="mono-font text-sm opacity-70">
              Try the Konami Code: ↑↑↓↓←→←→BA
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}