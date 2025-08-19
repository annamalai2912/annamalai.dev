'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    level: 1,
    title: "B.Tech Computer Science",
    organization: "University",
    period: "2018-2022",
    description: "Acquired foundational knowledge in programming, algorithms, and software engineering.",
    xp: "1000 XP"
  },
  {
    level: 2,
    title: "Full Stack Developer",
    organization: "Tech Company",
    period: "2022-2024",
    description: "Built modern web applications using React, Node.js, and various databases.",
    xp: "2500 XP"
  },
  {
    level: 3,
    title: "Senior Developer",
    organization: "Current Role",
    period: "2024-Present",
    description: "Leading development teams and architecting scalable solutions.",
    xp: "3000 XP"
  }
];

export default function Experience() {
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
            LEVEL PROGRESS
          </h2>
          <div className="w-24 h-1 bg-current mx-auto skill-bar" />
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="ascii-border p-6 bg-current bg-opacity-5">
                <div className="flex items-start gap-4">
                  <div className="pixel-border p-3 bg-current text-white min-w-0">
                    <div className="pixel-font text-sm">
                      LVL {exp.level}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="pixel-font text-lg glow-text">
                        {exp.title}
                      </h3>
                      <span className="mono-font text-sm opacity-70">
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="mono-font text-base mb-2 font-semibold">
                      {exp.organization}
                    </div>
                    
                    <p className="mono-font text-sm mb-3 opacity-80">
                      {exp.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="pixel-font text-xs glow-text">
                        +{exp.xp}
                      </div>
                      <div className="h-2 bg-current skill-bar flex-grow border border-current" />
                    </div>
                  </div>
                </div>
              </div>
              
              {index < experiences.length - 1 && (
                <div className="w-px h-8 bg-current mx-auto opacity-50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}