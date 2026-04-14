import { modules } from './processCatalog'
import { CATEGORY_LABELS } from '../types'

export type NavHit = {
  id: string
  title: string
  subtitle: string
  href: string
  categoryLabel: string
  /** Lowercase haystack for matching */
  haystack: string
}

let cache: NavHit[] | null = null

function buildIndex(): NavHit[] {
  const hits: NavHit[] = []
  for (const m of modules) {
    const cat = CATEGORY_LABELS[m.category]
    hits.push({
      id: `module-${m.id}`,
      title: m.title,
      subtitle: 'Open full module',
      href: `/app/module/${m.id}`,
      categoryLabel: cat,
      haystack: [
        m.title,
        m.subtitle,
        cat,
        ...m.keywords,
      ]
        .join(' ')
        .toLowerCase(),
    })
    for (const st of m.timeline) {
      hits.push({
        id: `stage-${m.id}-${st.id}`,
        title: st.title,
        subtitle: m.title,
        href: `/app/module/${m.id}?stage=${encodeURIComponent(st.id)}`,
        categoryLabel: cat,
        haystack: [
          st.title,
          st.shortLabel,
          m.title,
          cat,
          ...m.keywords,
        ]
          .join(' ')
          .toLowerCase(),
      })
    }
  }
  return hits
}

export function getSearchIndex(): NavHit[] {
  if (!cache) cache = buildIndex()
  return cache
}

export function searchNavHits(query: string, limit = 8): NavHit[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const idx = getSearchIndex()
  const scored = idx
    .map((h) => {
      if (h.haystack.includes(q)) return { h, s: 2 }
      const words = q.split(/\s+/).filter(Boolean)
      const w = words.every((x) => h.haystack.includes(x))
      return w ? { h, s: 1 } : { h, s: 0 }
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
  const out: NavHit[] = []
  const seen = new Set<string>()
  for (const { h } of scored) {
    if (out.length >= limit) break
    if (seen.has(h.href + h.title)) continue
    seen.add(h.href + h.title)
    out.push(h)
  }
  return out
}
