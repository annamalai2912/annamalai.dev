'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------
// Types
// ---------------------------
export type SkillNode = {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  xp?: number; // Gamified flair
  context?: string;
  projects?: string[];
  links?: { label: string; href: string }[];
};

export type SkillDomain = {
  domain: string;
  icon?: string; // simple emoji/icon for fun
  skills: SkillNode[];
};

// ---------------------------
// Data (expand/modify freely)
// ---------------------------
const SKILL_TREE: SkillDomain[] = [
  {
    domain: 'Frontend',
    icon: '🖥️',
    skills: [
      { name: 'React', level: 'Advanced', xp: 1200, projects: ['Portfolio', 'Dashboard'], context: 'Reusable components, hooks, state management, context, suspense.' },
      { name: 'Next.js', level: 'Intermediate', xp: 900, projects: ['Blog Platform'], context: 'SSR, SSG, App Router, API routes, image optimization.' },
      { name: 'Tailwind CSS', level: 'Advanced', xp: 1100, context: 'Utility-first design system, responsive design, dark mode.' },
      { name: 'Framer Motion', level: 'Intermediate', xp: 700, context: 'Page transitions, scroll animations, layout orchestration.' },
      { name: 'Three.js', level: 'Beginner', xp: 300, context: 'WebGL scenes, simple 3D interactions.' },
      { name: 'Svelte', level: 'Beginner', xp: 250, context: 'Lightweight reactivity and component patterns.' },
    ],
  },
  {
    domain: 'Backend',
    icon: '🧠',
    skills: [
      { name: 'Node.js', level: 'Advanced', xp: 1300, projects: ['API Server'], context: 'REST APIs, JWT auth, streams, performance profiling.' },
      { name: 'Express', level: 'Intermediate', xp: 850, context: 'Routing, middleware pipelines, validation.' },
      { name: 'Python', level: 'Advanced', xp: 1200, context: 'APIs, automation, data work, AI backends.' },
      { name: 'Java', level: 'Intermediate', xp: 800, context: 'Spring Boot basics, OOP, concurrency primitives.' },
      { name: 'Go (Golang)', level: 'Beginner', xp: 350, context: 'High-performance APIs, goroutines, channels.' },
      { name: 'Ruby', level: 'Beginner', xp: 300, context: 'Ruby on Rails MVC patterns.' },
      { name: 'Perl', level: 'Beginner', xp: 200, context: 'Quick automation scripts, text processing.' },
      { name: 'MySQL', level: 'Intermediate', xp: 900, context: 'Schema design, joins, indexing.' },
      { name: 'PostgreSQL', level: 'Intermediate', xp: 900, context: 'CTEs, JSONB, triggers, views.' },
      { name: 'MongoDB', level: 'Intermediate', xp: 800, context: 'Aggregation pipelines, flexible schemas.' },
    ],
  },
  {
    domain: 'DevOps & Cloud',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', xp: 1200, context: 'Branching, PRs, release flows.' },
      { name: 'Docker', level: 'Intermediate', xp: 950, context: 'Multi-stage builds, image slimming, Compose.' },
      { name: 'Kubernetes', level: 'Beginner', xp: 400, context: 'Workloads, services, scaling, Helm basics.' },
      { name: 'GitHub Actions', level: 'Intermediate', xp: 800, context: 'CI/CD workflows, build/test/deploy automations.' },
      { name: 'Terraform', level: 'Beginner', xp: 350, context: 'Infrastructure as Code for cloud resources.' },
      { name: 'Jenkins', level: 'Beginner', xp: 300, context: 'Declarative pipelines, on-prem automation.' },
      { name: 'AWS (EC2, S3, Lambda, API Gateway)', level: 'Intermediate', xp: 900, context: 'Compute, storage, serverless, IAM basics.' },
      { name: 'Azure', level: 'Beginner', xp: 300, context: 'App Services, pipelines, secrets.' },
      { name: 'GCP', level: 'Beginner', xp: 300, context: 'Cloud Run, GCS, BigQuery intro.' },
    ],
  },
  {
    domain: 'AI / GenAI',
    icon: '🧬',
    skills: [
      { name: 'OpenAI API', level: 'Intermediate', xp: 850, context: 'Chat, embeddings, function calling.' },
      { name: 'Hugging Face Transformers', level: 'Intermediate', xp: 850, context: 'Text generation, embeddings, pipelines.' },
      { name: 'LangChain', level: 'Intermediate', xp: 800, context: 'LLM chains, tools, agents.' },
      { name: 'RAG (Retrieval-Augmented Generation)', level: 'Intermediate', xp: 800, context: 'Chunking, retrieval, grounding knowledge.' },
      { name: 'Vector DBs (Pinecone/Weaviate)', level: 'Beginner', xp: 400, context: 'Semantic search, metadata filters.' },
      { name: 'LLMOps', level: 'Beginner', xp: 350, context: 'Prompt/version mgmt, evals, monitoring.' },
    ],
  },
  {
    domain: 'IoT & Edge',
    icon: '📶',
    skills: [
      { name: 'Arduino', level: 'Beginner', xp: 250, context: 'Sensors/actuators, serial protocols.' },
      { name: 'Raspberry Pi', level: 'Beginner', xp: 300, context: 'GPIO control, Linux services, camera.' },
      { name: 'MQTT', level: 'Beginner', xp: 250, context: 'Pub/Sub messaging for IoT.' },
      { name: 'ESP32', level: 'Beginner', xp: 220, context: 'Low-power Wi‑Fi/BLE microcontroller.' },
    ],
  },
  {
    domain: 'Tools & UX',
    icon: '🧩',
    skills: [
      { name: 'VS Code', level: 'Expert', xp: 1500, context: 'Debugging, tasks, extensions.' },
      { name: 'Figma', level: 'Intermediate', xp: 700, context: 'Wireframes, component libraries.' },
      { name: 'Postman', level: 'Intermediate', xp: 700, context: 'API tests, collections, monitors.' },
      { name: 'Linux CLI', level: 'Advanced', xp: 1200, context: 'Shell scripting, tooling, perf.' },
      { name: 'Jira', level: 'Intermediate', xp: 650, context: 'Agile, sprints, boards.' },
    ],
  },
];

// ---------------------------
// Helpers
// ---------------------------
const springy = { type: 'spring', stiffness: 160, damping: 20 } as const;

const DOMAIN_COLORS: Record<string, string> = {
  Frontend: 'emerald',
  Backend: 'cyan',
  'DevOps & Cloud': 'amber',
  'AI / GenAI': 'fuchsia',
  'IoT & Edge': 'violet',
  'Tools & UX': 'sky',
};

function colorize(domain: string) {
  const tone = DOMAIN_COLORS[domain] || 'emerald';
  // Tailwind class sets for borders/backgrounds/text glow
  return {
    ring: `ring-${tone}-400/40`,
    border: `border-${tone}-400/40`,
    bgSoft: `bg-${tone}-500/10`,
    text: `text-${tone}-200`,
    textSoft: `text-${tone}-200/80`,
    glow: `glow-text-${tone}`,
    bar: `bg-${tone}-400`,
    line: `stroke-${tone}-400/50`,
  };
}

// Very light-weight GitHub lookup for repos that *likely* match a skill
// You can replace this with your own API route for richer data.
async function fetchRepos(username: string): Promise<any[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { 'Accept': 'application/vnd.github+json' },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function matchReposToSkill(repos: any[], skill: string) {
  const s = skill.toLowerCase();
  return repos
    .filter((r) => {
      const name: string = (r.name || '').toLowerCase();
      const desc: string = (r.description || '').toLowerCase();
      const lang: string = (r.language || '').toLowerCase();
      return name.includes(s) || desc.includes(s) || lang.includes(s);
    })
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5);
}

// ---------------------------
// Skill Node (button + tooltip + modal trigger)
// ---------------------------
function NodeButton({
  domain,
  node,
  onClick,
}: {
  domain: string;
  node: SkillNode;
  onClick: () => void;
}) {
  const c = colorize(domain);
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl border ${c.border} ${c.bgSoft} px-4 py-3 transition shadow-[0_0_18px_rgba(0,0,0,0.35)] hover:shadow-[0_0_30px_rgba(0,0,0,0.55)]`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className={`pixel-font text-sm md:text-base ${c.text} ${c.glow}`}>{node.name}</div>
          <div className={`mono-font text-xs ${c.textSoft}`}>{node.level}{node.xp ? ` • ${node.xp} XP` : ''}</div>
        </div>
        <div className={`mono-font text-[10px] px-2 py-1 rounded border ${c.border} ${c.textSoft}`}>OPEN</div>
      </div>
      {/* tiny hover context */}
      {node.context && (
        <div className={`mono-font text-xs mt-2 opacity-80 ${c.textSoft}`}>{node.context}</div>
      )}
      <div className={`absolute inset-0 rounded-2xl pointer-events-none ring-1 ${c.ring} opacity-0 group-hover:opacity-100 transition`} />
    </motion.button>
  );
}

// ---------------------------
// Modal
// ---------------------------
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: springy }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative mx-4 w-full max-w-2xl rounded-2xl border border-emerald-400/30 bg-[#0a0a0a] p-6 text-white shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="pixel-font text-lg glow-text-emerald">{title}</div>
              <button onClick={onClose} className="mono-font text-sm text-emerald-200/80 hover:text-emerald-100">CLOSE</button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------
// SVG Connectors
// ---------------------------
function Connector({ colorClass }: { colorClass: string }) {
  return (
    <svg className="w-full h-6" viewBox="0 0 100 24" preserveAspectRatio="none">
      <motion.path
        d="M2,22 C35,22 65,2 98,2"
        className={`fill-none ${colorClass}`}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
    </svg>
  );
}

// ---------------------------
// Main Component
// ---------------------------
export default function Skills({ username = 'annamalai2912' }: { username?: string }) {
  const [activeDomain, setActiveDomain] = useState<string>('All');
  const [modalNode, setModalNode] = useState<{ domain: string; node: SkillNode } | null>(null);
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetchRepos(username).then(setRepos);
  }, [username]);

  const domains = useMemo(() => ['All', ...SKILL_TREE.map((d) => d.domain)], []);
  const filtered = useMemo(
    () => (activeDomain === 'All' ? SKILL_TREE : SKILL_TREE.filter((d) => d.domain === activeDomain)),
    [activeDomain]
  );

  return (
    <section id="skills" className="relative min-h-screen py-20 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background effects: CRT + scanlines + subtle radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_4px] animate-scanlines" />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.9)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <pre className="mono-font text-xs md:text-sm text-emerald-300/80 leading-5 select-none">
{`//==============================\\
  >>>>   SKILL ROADMAP  <<<<
\\==============================//`}
          </pre>
          <h2 className="pixel-font text-3xl md:text-5xl glow-text-emerald mt-2">TECH TREE</h2>
          <p className="mono-font text-sm text-emerald-200/70 mt-2">Hover to preview • Click to open • Toggle a domain to focus</p>
        </div>

        {/* Domain toggles */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDomain(d)}
              className={`mono-font text-xs md:text-sm px-3 py-2 rounded-lg border ${activeDomain === d ? 'border-emerald-400 bg-emerald-500/20' : 'border-emerald-400/40 bg-black/30 hover:bg-black/40'} transition`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Central hub node */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl blur-xl bg-emerald-400/20" />
            <div className="relative px-6 py-4 rounded-2xl border border-emerald-400/50 bg-black/40">
              <div className="pixel-font glow-text-emerald">FULL STACK DEV — HUB</div>
              <div className="mono-font text-xs text-emerald-200/80">Select a branch below to explore.</div>
            </div>
          </div>
        </div>

        {/* Tree grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((group) => {
            const c = colorize(group.domain);
            return (
              <motion.div
                key={group.domain}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={springy}
                className={`relative rounded-2xl border ${c.border} bg-black/30 p-4`}
              >
                {/* Domain header */}
                <div className="flex items-center justify-between">
                  <div className={`pixel-font ${c.text} ${c.glow}`}>{group.icon} {group.domain}</div>
                  <div className={`mono-font text-[10px] px-2 py-1 rounded border ${c.border} ${c.textSoft}`}>BRANCH</div>
                </div>

                {/* Connector from hub */}
                <Connector colorClass={c.line} />

                <div className="space-y-3">
                  {group.skills.map((node, idx) => (
                    <motion.div
                      key={node.name}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <NodeButton
                        domain={group.domain}
                        node={node}
                        onClick={() => setModalNode({ domain: group.domain, node })}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal with details & GitHub repos */}
      <Modal
        open={!!modalNode}
        onClose={() => setModalNode(null)}
        title={modalNode ? `${modalNode.node.name} — ${modalNode.node.level}` : ''}
      >
        {modalNode && (
          <div className="space-y-4">
            {modalNode.node.context && (
              <p className="mono-font text-sm text-emerald-100/90">
                {modalNode.node.context}
              </p>
            )}
            {modalNode.node.projects && modalNode.node.projects.length > 0 && (
              <div>
                <div className="mono-font text-xs text-emerald-200/70 mb-2">Related Projects</div>
                <ul className="list-disc list-inside space-y-1 mono-font text-sm">
                  {modalNode.node.projects.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested repos by simple match */}
            <div>
              <div className="mono-font text-xs text-emerald-200/70 mb-2">GitHub Repos (auto‑matched)</div>
              <RepoMatches repos={repos} skill={modalNode.node.name} />
            </div>

            {/* Helpful links */}
            {modalNode.node.links && modalNode.node.links.length > 0 && (
              <div>
                <div className="mono-font text-xs text-emerald-200/70 mb-2">Links</div>
                <div className="flex flex-wrap gap-2">
                  {modalNode.node.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="mono-font text-xs px-2 py-1 rounded border border-emerald-400/40 hover:bg-emerald-500/10">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Local styles */}
      <style jsx global>{`
        .pixel-font { font-family: 'Press Start 2P', ui-monospace, monospace; }
        .mono-font { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
        .glow-text-emerald { text-shadow: 0 0 8px rgba(16,185,129,0.75), 0 0 20px rgba(16,185,129,0.35); }
        .glow-text-cyan { text-shadow: 0 0 8px rgba(34,211,238,0.75), 0 0 20px rgba(34,211,238,0.35); }
        .glow-text-amber { text-shadow: 0 0 8px rgba(245,158,11,0.75), 0 0 20px rgba(245,158,11,0.35); }
        .glow-text-fuchsia { text-shadow: 0 0 8px rgba(217,70,239,0.75), 0 0 20px rgba(217,70,239,0.35); }
        .glow-text-violet { text-shadow: 0 0 8px rgba(139,92,246,0.75), 0 0 20px rgba(139,92,246,0.35); }
        .glow-text-sky { text-shadow: 0 0 8px rgba(56,189,248,0.75), 0 0 20px rgba(56,189,248,0.35); }

        @keyframes scanlines { from { transform: translateY(0); } to { transform: translateY(4px); } }
        .animate-scanlines { animation: scanlines .12s linear infinite; }
      `}</style>
    </section>
  );
}

// ---------------------------
// Repo Matches (small list)
// ---------------------------
function RepoMatches({ repos, skill }: { repos: any[]; skill: string }) {
  const list = useMemo(() => matchReposToSkill(repos, skill), [repos, skill]);
  if (!list || list.length === 0) {
    return <div className="mono-font text-xs text-emerald-200/60">No obvious matches found. Try tagging repos or naming them with the skill.</div>;
  }
  return (
    <div className="space-y-2">
      {list.map((r) => (
        <a
          key={r.id}
          href={r.html_url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg border border-emerald-400/30 p-3 hover:bg-emerald-500/10"
        >
          <div className="flex items-center justify-between">
            <div className="mono-font text-sm text-emerald-100/90">{r.full_name}</div>
            <div className="mono-font text-xs text-emerald-200/70">★ {r.stargazers_count || 0}</div>
          </div>
          {r.description && (
            <div className="mono-font text-xs text-emerald-200/70 mt-1 line-clamp-2">{r.description}</div>
          )}
        </a>
      ))}
    </div>
  );
}
