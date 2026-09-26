export const PUBLIC_PATHS = [
  "/",
  "/youtube",
  "/monetization",
  "/thumbnails",
  "/transcript",
  "/tools",
  "/blog",
  "/about",
  "/privacy",
  "/terms",
  "/blog/youtube-subscriber-count",
  "/blog/youtube-rounded-subscribers",
  "/blog/youtube-monetization-check",
  "/blog/download-youtube-thumbnail",
  "/blog/youtube-transcript-generator",
] as const;

export function seo(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    ],
  };
}
