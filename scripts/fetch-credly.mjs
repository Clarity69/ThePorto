// Ambil semua badge publik dari Credly → src/data/credlyData.json
// + unduh gambar badge ke public/certs/credly/
//
// Jalankan:  node scripts/fetch-credly.mjs
// (Node 18+ — tidak butuh package tambahan)

import { mkdir, writeFile } from 'node:fs/promises';

const USER = 'ahmad-taroqi';
const IMG_DIR = 'public/certs/credly';
const OUT_JSON = 'src/data/credlyData.json';

// "Google Cloud Computing Foundations" → "google-cloud-computing-foundations"
const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

async function getAllBadges() {
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `https://www.credly.com/users/${USER}/badges.json?page=${page}&per_page=48`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) throw new Error(`Credly ${res.status} ${res.statusText}`);
    const json = await res.json();
    all.push(...(json.data ?? []));
    const total = json.metadata?.total_pages ?? 1;
    if (page >= total) break;
  }
  return all;
}

const badges = await getAllBadges();
await mkdir(IMG_DIR, { recursive: true });

const seen = new Set();
const result = [];

for (const b of badges) {
  const t = b.badge_template ?? {};
  const title = t.name ?? 'Untitled badge';
  let slug = slugify(title);
  while (seen.has(slug)) slug += '-2';
  seen.add(slug);

  const org =
    b.issuer?.entities?.find((e) => e.primary)?.entity?.name ??
    b.issuer?.entities?.[0]?.entity?.name ??
    t.issuer?.entities?.[0]?.entity?.name ??
    null;

  const skills = (t.skills ?? [])
    .map((s) => (typeof s === 'string' ? s : s?.name))
    .filter(Boolean)
    .slice(0, 4);

  // Unduh gambar badge (PNG) — nanti dikonversi ke WebP
  const imgUrl = b.image_url ?? t.image_url;
  if (imgUrl) {
    const img = await fetch(imgUrl);
    if (img.ok) {
      await writeFile(`${IMG_DIR}/${slug}.png`, Buffer.from(await img.arrayBuffer()));
    }
  }

  result.push({
    title,
    issuer: 'credly',
    org,
    date: b.issued_at_date ?? b.issued_at?.slice(0, 10),
    url: `https://www.credly.com/badges/${b.id}`,
    image: imgUrl ? `/certs/credly/${slug}.webp` : undefined,
    skills,
  });
}

await writeFile(OUT_JSON, JSON.stringify(result, null, 2) + '\n');

console.log(`✔ ${result.length} badge disimpan ke ${OUT_JSON}`);
for (const r of result) console.log(`  ${r.date}  ${r.org ?? '-'}  —  ${r.title}`);
console.log(`\nLangkah berikut: konversi gambar ke WebP:
  for f in ${IMG_DIR}/*.png; do magick "$f" -resize 240x240 -quality 85 "\${f%.png}.webp" && rm "$f"; done`);
