export type Platform = "youtube";

export type Profile = {
  platform: Platform;
  id: string;
  title: string;
  handle: string;
  description: string;
  country: string;
  publishedAt: string;
  subscribers: number;
  views: number;
  videos: number;
  hidden: boolean;
  avatar: string;
  revenueLow: number;
  revenueHigh: number;
  revenueLabel: string;
  source: "youtube-data-api" | "youtube-public" | "preview";
  note: string;
};

export type PostBlock = { kind: "h2" | "p"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  minutes: number;
  blocks: PostBlock[];
};
