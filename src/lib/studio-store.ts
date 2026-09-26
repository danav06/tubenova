import type { Post } from "@/lib/types";

const KEY = "orbitcount.posts";

export function readExtraPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Post[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((post) => post && typeof post.slug === "string" && typeof post.title === "string");
  } catch {
    return [];
  }
}

export function writeExtraPosts(posts: Post[]) {
  window.localStorage.setItem(KEY, JSON.stringify(posts));
}
