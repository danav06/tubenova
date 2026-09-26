import type { Post } from "@/lib/types";

export const POSTS: Post[] = [
  {
    slug: "youtube-subscriber-count",
    title: "How to check a YouTube subscriber count",
    description: "Channel page, Studio, the Data API, and why the public number is rounded.",
    date: "2026-09-26",
    category: "YouTube",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "A YouTube subscriber count comes from four honest places: the public channel page, YouTube Studio if you own the channel, the YouTube Data API, or a checker like TubeNova that reads the public page.",
      },
      { kind: "h2", text: "On the channel page" },
      {
        kind: "p",
        text: "Open the channel. Under the name, YouTube prints a public subscriber figure. Above 1,000 subscribers that figure is rounded to three significant figures. 123,456 shows as 123,000. That is platform policy, not a broken tracker.",
      },
      { kind: "h2", text: "In Studio" },
      {
        kind: "p",
        text: "Exact unrounded counts live in YouTube Studio and are visible only to the channel owner. Public pages do not return that private number.",
      },
      { kind: "h2", text: "In TubeNova" },
      {
        kind: "p",
        text: "Paste a youtube.com URL, @handle, or UC id on the YouTube page. TubeNova shows the public photo, subscribers, views, and videos.",
      },
    ],
  },
  {
    slug: "youtube-rounded-subscribers",
    title: "Why YouTube subscriber counts look stuck",
    description: "Three significant figures, hidden counts, and what still moves.",
    date: "2026-09-26",
    category: "YouTube",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "A channel can gain thousands of people and the public counter will not blink. That is rounding.",
      },
      { kind: "h2", text: "Three significant figures" },
      {
        kind: "p",
        text: "Once a channel passes 1,000 subscribers, the public subscriber count is rounded to three significant figures. It stays on that plateau until the true count crosses the next display bucket.",
      },
      { kind: "h2", text: "Hidden counts" },
      {
        kind: "p",
        text: "Owners can hide the public subscriber number. TubeNova flags that instead of inventing a figure.",
      },
      { kind: "h2", text: "What still updates" },
      {
        kind: "p",
        text: "View counts and public video counts are not rounded the same way. They are the better signal that a feed is fresh while subscribers sit still.",
      },
    ],
  },
  {
    slug: "youtube-monetization-check",
    title: "How to check if a YouTube channel is monetized",
    description: "The public 1,000-subscriber bar, and what a monetization check can and cannot see.",
    date: "2026-09-26",
    category: "YouTube",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "People search “is this YouTube channel monetized” because the public page never prints a yes or no. YouTube only shows that answer to the channel owner.",
      },
      { kind: "h2", text: "The public bar" },
      {
        kind: "p",
        text: "A channel needs at least 1,000 subscribers before it can turn on ads. Under that number it cannot be monetized. TubeNova’s monetization check uses that public rule and shows Monetized or Not monetized.",
      },
      { kind: "h2", text: "What the check cannot see" },
      {
        kind: "p",
        text: "Watch hours, strikes, and whether the owner actually applied live in YouTube Studio. A channel past 1,000 subscribers can still leave ads off. The check tells you the channel is eligible, not the owner’s private payout.",
      },
    ],
  },
  {
    slug: "download-youtube-thumbnail",
    title: "How to download a YouTube thumbnail",
    description: "Save a video thumbnail or a channel profile photo from a public link.",
    date: "2026-09-26",
    category: "YouTube",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Every public YouTube video has a thumbnail image, and every channel has a profile photo. TubeNova can save those pictures from the link you paste.",
      },
      { kind: "h2", text: "A video thumbnail" },
      {
        kind: "p",
        text: "Open Thumbnails and paste a watch, shorts, or youtu.be link. TubeNova loads the largest public thumbnail and gives you a download.",
      },
      { kind: "h2", text: "A channel photo" },
      {
        kind: "p",
        text: "Paste a channel URL or @handle instead. You get the profile photo plus thumbnails from recent public videos.",
      },
    ],
  },
  {
    slug: "youtube-transcript-generator",
    title: "YouTube transcript generator",
    description: "Turn a YouTube video link into readable paragraphs from the spoken captions.",
    date: "2026-09-26",
    category: "YouTube",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "A YouTube transcript generator takes a video link and returns the words that were spoken. TubeNova uses the caption track YouTube already made from the audio, and the creator’s own captions when those exist.",
      },
      { kind: "h2", text: "How to use it" },
      {
        kind: "p",
        text: "Open Transcript, paste a watch or shorts link, and press Get transcript. The result is plain paragraphs, without timestamps. You can copy it or download a text file.",
      },
      { kind: "h2", text: "When it is missing" },
      {
        kind: "p",
        text: "If a video has no caption track, there is nothing to read. Music-only clips and videos with captions turned off will not produce a transcript.",
      },
    ],
  },
];

export function findPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
