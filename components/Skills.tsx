'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'JavaScript', level: 90, icon: '🟨' },
  { name: 'TypeScript', level: 85, icon: '🔷' },
  { name: 'React', level: 88, icon: '⚛️' },
  { name: 'Next.js', level: 82, icon: '▲' },
  { name: 'Node.js', level: 80, icon: '💚' },
  { name: 'Python', level: 75, icon: '🐍' },
  { name: 'Git', level: 90, icon: '🌿' },
  { name: 'MongoDB', level: 70, icon: '🍃' },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="min-h-screen py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="pixel-font text-3xl md:text-5xl glow-text mb-4">
            SKILL TREE
          </h2>
          <div className="w-24 h-1 bg-current mx-auto skill-bar" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="ascii-border p-4 bg-current bg-opacity-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="pixel-font text-sm flex items-center gap-2">
                  <span>{skill.icon}</span>
                  {skill.name}
                </span>
                <span className="mono-font text-sm">
                  {skill.level}/100
                </span>
              </div>
              
              <div className="h-6 border-2 border-current bg-transparent">
                <motion.div
                  className="h-full bg-current skill-bar"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="pixel-border p-8 bg-current bg-opacity-10 inline-block">
            <h3 className="pixel-font text-xl glow-text mb-4">GITHUB STATS</h3>
            <div className="grid grid-cols-3 gap-8 mono-font text-lg">
              <div>
                <div className="text-2xl glow-text">★ 0</div>
                <div className="text-sm opacity-80">STARS</div>
              </div>
              <div>
                <div className="text-2xl glow-text">⑂ 0</div>
                <div className="text-sm opacity-80">FORKS</div>
              </div>
              <div>
                <div className="text-2xl glow-text">📈 365</div>
                <div className="text-sm opacity-80">CONTRIBUTIONS</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}