'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchGitHubProfile, type GitHubUser } from '@/lib/github';

export default function About() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchGitHubProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="pixel-font text-xl glow-text blink">LOADING USER DATA...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="pixel-font text-3xl md:text-5xl glow-text mb-4">
            WHO AM I?
          </h2>
          <div className="w-24 h-1 bg-current mx-auto skill-bar" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="pixel-border p-4 bg-current bg-opacity-10 inline-block mb-6">
              <div className="w-48 h-48 mx-auto relative overflow-hidden">
                {profile?.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || 'Profile'}
                    className="w-full h-full object-cover"
                    style={{ imageRendering: 'pixelated' }}
                  />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="pixel-font text-xl glow-text">
                {profile?.name || 'DEVELOPER'}
              </h3>
              <p className="mono-font text-lg">
                @{profile?.login || 'annamalai2912'}
              </p>
              {profile?.location && (
                <p className="mono-font">📍 {profile.location}</p>
              )}
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ascii-border p-6 bg-current bg-opacity-5"
          >
            <div className="space-y-4">
              <div className="mono-font text-sm opacity-80">
                &gt; cat about.txt
              </div>
              <div className="mono-font text-lg leading-relaxed">
                {profile?.bio || 
                  "Full Stack Developer passionate about creating innovative solutions and building amazing user experiences with modern technologies."}
              </div>
              
              <div className="pt-4 border-t border-current opacity-50">
                <div className="flex flex-wrap gap-4 text-sm mono-font">
                  <span>👥 {profile?.followers || 0} followers</span>
                  <span>📚 {profile?.public_repos || 0} repositories</span>
                  {profile?.company && (
                    <span>🏢 {profile.company}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}