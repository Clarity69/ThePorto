import { useEffect, useState } from 'react';

const CACHE_TTL = 60 * 60 * 1000; // 1 jam

// Ambil data dari localStorage kalau masih "segar" (< 1 jam)
function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    return Date.now() - savedAt < CACHE_TTL ? data : null;
  } catch {
    return null;
  }
}

// Simpan hanya field yang dipakai, supaya cache kecil
const toRepo = (r) => ({
  name: r.name,
  description: r.description,
  url: r.html_url,
  homepage: r.homepage,
  language: r.language,
  stars: r.stargazers_count,
  forks: r.forks_count,
  topics: r.topics ?? [],
  updatedAt: r.pushed_at,
  fork: r.fork,
  archived: r.archived,
});

export default function useGithubRepos(username) {
  const cacheKey = `theporto-gh-repos-${username}`;

  // State awal: pakai cache kalau ada → tidak perlu loading
  const [state, setState] = useState(() => {
    const cached = readCache(cacheKey);
    return { repos: cached ?? [], loading: !cached, error: null };
  });

  useEffect(() => {
    if (readCache(cacheKey)) return; // cache masih segar, tidak perlu fetch

    // AbortController: batalkan request kalau komponen hilang sebelum selesai
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 403 || res.status === 429) throw new Error('rate limit');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const repos = data.map(toRepo);
        setState({ repos, loading: false, error: null });
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), data: repos }));
        } catch {
          /* abaikan */
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState((s) => ({ ...s, loading: false, error: err.message }));
      });

    return () => controller.abort();
  }, [cacheKey, username]);

  return state; // { repos, loading, error }
}
