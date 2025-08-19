import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
});

const username = 'annamalai2912';

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string;
  blog: string;
  twitter_username: string | null;
  company: string | null;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  homepage: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalContributions: number;
}

export async function fetchGitHubProfile(): Promise<GitHubUser> {
  try {
    const { data } = await octokit.users.getByUsername({ username });
    return data as GitHubUser;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    // Fallback data
    return {
      login: 'annamalai2912',
      name: 'Annamalai',
      bio: 'Full Stack Developer passionate about creating innovative solutions',
      avatar_url: 'https://github.com/annamalai2912.png',
      followers: 0,
      following: 0,
      public_repos: 0,
      location: 'India',
      blog: '',
      twitter_username: null,
      company: null,
    };
  }
}

export async function fetchRepositories(): Promise<Repository[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 6,
      type: 'owner'
    });
    return data as Repository[];
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const { data: repos } = await octokit.repos.listForUser({
      username,
      per_page: 100
    });
    
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
    const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0);
    
    // Note: GitHub doesn't provide contribution count via API
    // This would need to be scraped or manually updated
    const totalContributions = 365; // Placeholder
    
    return {
      totalStars,
      totalForks,
      totalContributions,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      totalStars: 0,
      totalForks: 0,
      totalContributions: 0,
    };
  }
}

export async function fetchReadme(): Promise<string> {
  try {
    const { data } = await octokit.repos.getReadme({
      owner: username,
      repo: username, // Profile README
    });
    
    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    console.error('Error fetching README:', error);
    return `# Hi there! 👋

I'm a passionate Full Stack Developer with expertise in modern web technologies.

## 🚀 Skills
- JavaScript/TypeScript
- React/Next.js
- Node.js
- Python
- Git/GitHub

## 🎯 Interests
- Web Development
- Open Source
- Technology Innovation

Let's build something amazing together!`;
  }
}