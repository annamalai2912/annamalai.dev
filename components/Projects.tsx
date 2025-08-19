'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchRepositories, type Repository } from '@/lib/github';

export default function Projects() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // client-only flag

    const loadRepositories = async () => {
      try {
        const data = await fetchRepositories();
        setRepositories(data);
      } catch (error) {
        console.error('Failed to load repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  const filteredRepos = repositories.filter(repo => {
    const matchesFilter = filter === 'all' || repo.language?.toLowerCase() === filter;
    const matchesSearch =
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      (repo.description?.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="pixel-font text-xl glow-text blink">LOADING CARTRIDGES...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="pixel-font text-3xl md:text-5xl glow-text mb-4">
            GAME COLLECTION
          </h2>
          <div className="w-24 h-1 bg-current mx-auto skill-bar" />
          <p className="mono-font text-lg mt-4 opacity-80">
            Select a cartridge to play — browse by genre, language, or search
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="🔍 Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {isClient && (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm"
            >
              <option value="all">All Languages</option>
              {Array.from(new Set(repositories.map(r => r.language).filter(Boolean))).map(lang => (
                <option key={lang} value={lang?.toLowerCase()}>{lang}</option>
              ))}
            </select>
          )}
        </div>

        {/* Repository Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="cartridge p-6 hover:scale-105 transition-transform duration-200 cursor-pointer glitch relative group"
              onClick={() => window.open(repo.html_url, '_blank')}
            >
              <div className="h-full flex flex-col">
                <div className="text-center mb-4">
                  <div className="pixel-font text-lg glow-text mb-2">
                    {repo.name.toUpperCase()}
                  </div>
                  {repo.language && (
                    <div className="mono-font text-sm opacity-70">
                      {repo.language}
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <p className="mono-font text-sm mb-4 h-16 overflow-hidden">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex justify-between items-center text-xs mono-font">
                    <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1">🍴 {repo.forks_count}</span>
                    {isClient && (
                      <span className="flex items-center gap-1">📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-current border-opacity-30">
                  <motion.button
                    className="pixel-button w-full py-2 pixel-font text-xs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ▶ PLAY
                  </motion.button>
                </div>

                {/* Hover overlay */}
                {isClient && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <p className="mono-font text-sm mb-2">{repo.description || 'No description'}</p>
                    <p className="text-xs opacity-70">Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center mt-12">
            <div className="pixel-border p-8 bg-current bg-opacity-10 inline-block">
              <p className="pixel-font text-lg glow-text">NO CARTRIDGES FOUND</p>
              <p className="mono-font text-sm mt-2 opacity-70">
                Try adjusting your search or filters to discover more!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
