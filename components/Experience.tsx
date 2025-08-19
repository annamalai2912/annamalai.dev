'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  BrainCircuit,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpenText
} from 'lucide-react';

/**
 * Experience.tsx
 * Full-featured, black + neon career roadmap with:
 * - Tree & Timeline view
 * - SVG connectors (animated)
 * - Expandable nodes with highlights, tech chips and links
 * - Keyboard navigation (ArrowUp, ArrowDown, Enter)
 * - Scanline / CRT overlay, neon glow styling
 * - Proper alignment for tree mode
 *
 * Drop into your Next.js app (client component).
 */

/* ---------- Types ---------- */
interface JourneyNode {
  id: string;
  title: string;
  role: string;
  period: string;
  organization?: string;
  summary: string;
  highlights: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  accent: string; // hex color
  icon: React.ComponentType<any>;
  current?: boolean;
}

/* ---------- Data (ordered) ---------- */
const journey: JourneyNode[] = [
  {
    id: 'mca',
    title: 'MCA Graduate',
    role: 'Master of Computer Applications',
    period: '2018 - 2021',
    organization: 'University / Institute',
    summary:
      'Solid foundations in algorithms, data structures, databases, operating systems, distributed systems, and software engineering through labs and projects.',
    highlights: [
      'Capstone project covering full SDLC',
      'Multiple hackathons and coding competitions',
      'Strong academic training in algorithms & DBMS'
    ],
    tech: ['Java', 'Python', 'SQL', 'OOP', 'DSA', 'Git'],
    links: [{ label: 'Academic Projects', href: '#projects' }],
    accent: '#06b6d4', // cyan
    icon: GraduationCap
  },
  {
    id: 'fsd',
    title: 'Full Stack Developer',
    role: 'Frontend + Backend + DevOps',
    period: '2021 - 2023',
    organization: 'TechKnots',
    summary:
      'Delivered production-grade web features: accessible frontends, robust APIs, relational and NoSQL databases, and automated CI/CD pipelines. Collaborated closely with designers, QA and PMs.',
    highlights: [
      'Built performant React/Next.js frontends with accessibility and testing',
      'Designed REST/GraphQL APIs; integrated PostgreSQL & MongoDB',
      'Containerized apps and automated pipelines (Docker, GitHub Actions)'
    ],
    tech: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'AWS'
    ],
    links: [
      { label: 'Featured Repos', href: '#projects' },
      { label: 'Related Skills', href: '#skills' }
    ],
    accent: '#f472b6', // pink
    icon: Code2
  },
  {
    id: 'nlp',
    title: 'Deep Learning / NLP Engineer',
    role: 'LLMs • Transformers • RAG',
    period: '2023 - Present',
    organization: 'TechKnots',
    summary:
      'Building GenAI & NLP systems: prompt engineering, fine-tuning, retrieval pipelines, scalable inference, and safety/monitoring.',
    highlights: [
      'Implemented RAG with embeddings and vector stores',
      'Fine-tuned transformers for domain-specific tasks',
      'Built evaluation pipelines and monitoring/guardrails'
    ],
    tech: [
      'Python',
      'PyTorch',
      'Transformers',
      'LangChain',
      'OpenAI API',
      'FastAPI',
      'Weaviate/FAISS',
      'AWS'
    ],
    links: [
      { label: 'AI Projects', href: '#projects' },
      { label: 'GenAI Skills', href: '#skills' }
    ],
    accent: '#a78bfa', // violet
    icon: BrainCircuit,
    current: true
  }
];

/* ---------- Visual helpers ---------- */
import { easeInOut } from 'framer-motion';

const shimmer = {
  initial: { opacity: 0.12 },
  animate: { opacity: [0.12, 0.28, 0.12] },
  transition: { duration: 2.2, repeat: Infinity, ease: easeInOut } // use built-in easing array
};

const springy = { type: 'spring', stiffness: 160, damping: 20 } as const;

/* ---------- Utils ---------- */
const scrollIntoView = (id: string) => {
  const el = document.getElementById(`node-${id}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/* ---------- Main Component ---------- */
export default function Experience() {
  const [expanded, setExpanded] = useState<string | null>('nlp'); // default open current
  const [mode, setMode] = useState<'tree' | 'timeline'>('tree');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return;
      e.preventDefault();
      const idx = expanded ? journey.findIndex((j) => j.id === expanded) : 0;
      if (e.key === 'Enter') {
        setExpanded((cur) => (cur ? null : journey[idx].id));
        return;
      }
      if (e.key === 'ArrowDown') {
        const nextIdx = Math.min(idx + 1, journey.length - 1);
        setExpanded(journey[nextIdx].id);
        scrollIntoView(journey[nextIdx].id);
      }
      if (e.key === 'ArrowUp') {
        const prevIdx = Math.max(idx - 1, 0);
        setExpanded(journey[prevIdx].id);
        scrollIntoView(journey[prevIdx].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [expanded]);

  const connectors = useMemo(
    () =>
      journey.slice(0, -1).map((node, i) => ({
        from: node.id,
        to: journey[i + 1].id,
        idx: i
      })),
    []
  );

  return (
    <section
      id="experience"
      className="min-h-screen py-20 px-4 bg-black text-white relative overflow-hidden"
    >
      {/* Scanline overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_2px]"
        {...shimmer}
      />

      <div className="max-w-6xl mx-auto relative" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="pixel-font text-3xl md:text-5xl glow-text mb-2 text-cyan-400">
            CAREER ROADMAP
          </h2>
          <p className="mono-font text-base opacity-80 mb-4">
            A branching, retro-styled journey — <span className="text-cyan-400">MCA</span> →{' '}
            <span className="text-pink-400">Full Stack</span> →{' '}
            <span className="text-purple-400">NLP / GenAI</span> (TechKnots).
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setMode('tree')}
              className={`pixel-button px-4 py-2 text-sm ${mode === 'tree' ? 'ring-2 ring-cyan-400' : ''}`}
            >
              🌿 Tree Mode
            </button>
            <button
              onClick={() => setMode('timeline')}
              className={`pixel-button px-4 py-2 text-sm ${mode === 'timeline' ? 'ring-2 ring-pink-400' : ''}`}
            >
              📜 Timeline Mode
            </button>
            <a href="/resume.pdf" className="pixel-button px-4 py-2 text-sm">
              ⬇️ Download Resume
            </a>
          </div>
        </motion.div>

        {/* SVG connectors */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" aria-hidden>
          {connectors.map((c) => {
            // Build a smooth curve between nodes; positions are approximations so they animate in on view.
            // Using stroke dasharray for retro dotted/circuit look.
            const yFrom = 180 + c.idx * 260;
            const yTo = 320 + c.idx * 260;
            const dTree = `M 60 ${yFrom} C 260 ${yFrom}, 260 ${yTo}, 60 ${yTo}`;
            const dLine = `M 50 ${yFrom} L 50 ${yTo}`;
            const path = mode === 'tree' ? dTree : dLine;
            return (
              <motion.path
                key={c.from}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: c.idx * 0.12 }}
                d={path}
                stroke={c.idx % 2 === 0 ? '#06b6d4' : '#f472b6'}
                strokeWidth="2"
                fill="none"
                strokeDasharray="6 6"
                opacity="0.45"
              />
            );
          })}
        </svg>

        {/* Nodes layout:
            For improved tree alignment we use a responsive 3-column layout:
            col-1 (left nodes), col-2 (spine), col-3 (right nodes).
            Each journey item is placed into either left or right zone to form a tree-like structure.
        */}
        <div className="relative z-10">
          {mode === 'tree' ? (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-y-12 gap-x-8 items-start">
              {journey.map((node, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={node.id} className={isLeft ? 'md:col-start-1' : 'md:col-start-3'}>
                    <RoadmapNode
                      data={node}
                      expanded={expanded === node.id}
                      onToggle={() => setExpanded(expanded === node.id ? null : node.id)}
                    />
                  </div>
                );
              })}
              {/* center spine (empty cells to keep spacing) */}
              <div className="md:col-start-2 md:row-span-3 hidden md:block" />
            </div>
          ) : (
            // timeline mode: vertical list with left spine
            <div className="relative border-l-2 border-cyan-400 pl-8 space-y-12">
              {journey.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.14 }}
                  className="relative"
                >
                  <div className="absolute -left-5 top-3 w-3 h-3 rounded-full" style={{ background: idx === journey.length - 1 ? '#a78bfa' : '#06b6d4' }} />
                  <RoadmapNode
                    data={exp}
                    expanded={expanded === exp.id}
                    onToggle={() => setExpanded(expanded === exp.id ? null : exp.id)}
                  />
            </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Node Component ---------- */
function RoadmapNode({ data, expanded, onToggle }: { data: JourneyNode; expanded: boolean; onToggle: () => void }) {
  const Icon = data.icon;
  return (
    <motion.div
      className="ascii-border rounded-2xl p-5 md:p-6 bg-white/5 hover:bg-white/8 transition-colors cursor-pointer"
      style={{ borderColor: data.accent, boxShadow: `0 6px 30px ${data.accent}22` }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onToggle();
      }}
      aria-expanded={expanded}
    >
      <div className="flex items-start gap-4">
        {/* Icon / badge */}
        <div className="pixel-border p-3 bg-black/60 rounded-md" style={{ borderColor: data.accent }}>
          <Icon className="w-6 h-6" style={{ color: data.accent }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
            <div className="flex items-center gap-3">
              <h3 className="pixel-font text-xl" style={{ color: data.accent }}>
                {data.title}
              </h3>
              {data.current && (
                <span className="ml-1 text-xs mono-font px-2 py-1 rounded pixel-border" style={{ borderColor: data.accent }}>
                  CURRENT
                </span>
              )}
            </div>

            <div className="text-right">
              <div className="mono-font text-sm opacity-80">{data.role}</div>
              <span className="mono-font text-xs opacity-60">{data.period}</span>
            </div>
          </div>

          {data.organization && <div className="mono-font text-sm text-white/80 mt-3">{data.organization}</div>}

          <p className="mono-font text-sm text-white/80 mt-3">{data.summary}</p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {data.tech.map((t) => (
              <span
                key={t}
                className="text-xs mono-font px-2 py-1 pixel-border bg-black/60 rounded"
                style={{ borderColor: data.accent }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Expandable area */}
          <motion.div initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} className="overflow-hidden">
            <div className="mt-4 pt-4 border-t border-white/10">
              <ul className="list-disc list-inside space-y-2 mono-font text-sm text-white/80">
                {data.highlights.map((h) => (
                  <li key={h} className="marker:text-white/50">
                    {h}
                  </li>
                ))}
              </ul>

              {data.links && data.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {data.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="pixel-button px-3 py-1 text-xs inline-flex items-center gap-2"
                    >
                      <LinkIcon className="w-3.5 h-3.5" /> {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* chevron (desktop) */}
        <div className="ml-auto hidden md:flex items-center">
          {expanded ? <ChevronUp className="w-5 h-5 opacity-70" /> : <ChevronDown className="w-5 h-5 opacity-70" />}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Local Styles (global in component scope) ---------- */
const styleBlock = `
  .pixel-font { font-family: 'Press Start 2P', ui-monospace, monospace; }
  .mono-font { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  .ascii-border { border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; }
  .pixel-border { border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; }
  .pixel-button { border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); padding: 0.5rem 0.75rem; border-radius: 10px; }
  .glow-text { text-shadow: 0 0 8px rgba(255,255,255,0.04); }
`;

/* Append styles to head once */
if (typeof window !== 'undefined') {
  if (!document.getElementById('experience-styles')) {
    const s = document.createElement('style');
    s.id = 'experience-styles';
    s.innerHTML = styleBlock;
    document.head.appendChild(s);
  }
}
