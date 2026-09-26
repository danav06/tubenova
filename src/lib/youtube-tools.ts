import { createServerFn } from "@tanstack/react-start";
import { publicYouTube } from "@/lib/lookup";

export type Thumb = { id: string; title: string; url: string; label: string };
export type MonetizationReport = {
  title: string;
  handle: string;
  avatar: string;
  subscribers: number;
  views: number;
  videos: number;
  eligible: boolean;
  headline: string;
  detail: string;
};
export type TranscriptLine = { at: string; text: string };
export type Transcript = { title: string; author: string; language: string; lines: TranscriptLine[]; text: string };

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function queryOf(data: unknown): string {
  const q = String((data as { q?: unknown })?.q ?? "").trim();
  if (!q || q.length > 400) throw new Error("Paste a YouTube link.");
  return q;
}

async function getText(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": UA, "accept-language": "en-US,en;q=0.9" },
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function videoId(q: string): string | null {
  const raw = q.trim();
  if (/^[\w-]{11}$/.test(raw)) return raw;
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0] || "";
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    const v = url.searchParams.get("v");
    if (v && /^[\w-]{11}$/.test(v)) return v;
    const parts = url.pathname.split("/").filter(Boolean);
    if (["shorts", "embed", "live", "v"].includes(parts[0] || "") && parts[1] && /^[\w-]{11}$/.test(parts[1])) return parts[1];
  } catch {
    /* not a url */
  }
  return null;
}

function channelUrl(q: string): string {
  const raw = q.trim();
  if (raw.startsWith("@")) return `https://www.youtube.com/${raw}/videos`;
  if (/^UC[\w-]{20,}$/.test(raw)) return `https://www.youtube.com/channel/${raw}/videos`;
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0]?.startsWith("@")) return `https://www.youtube.com/${parts[0]}/videos`;
    if (parts[0] === "channel" && parts[1]) return `https://www.youtube.com/channel/${parts[1]}/videos`;
    if (parts[0]) return `https://www.youtube.com/${parts[0]}/videos`;
  } catch {
    /* plain name */
  }
  return `https://www.youtube.com/@${raw.replace(/^@/, "")}/videos`;
}

function initialData(html: string): unknown | null {
  const marker = html.indexOf("ytInitialData");
  if (marker < 0) return null;
  const start = html.indexOf("{", marker);
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < html.length; i += 1) {
    const char = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

function videosFrom(node: unknown, out: Array<{ id: string; title: string }>, depth = 0) {
  if (!node || typeof node !== "object" || depth > 22 || out.length >= 12) return;
  const record = node as Record<string, unknown>;
  const id = record.videoId;
  const titleNode = record.title as { runs?: Array<{ text?: string }>; simpleText?: string; content?: string } | undefined;
  const title = titleNode?.runs?.[0]?.text || titleNode?.simpleText || titleNode?.content;
  if (typeof id === "string" && /^[\w-]{11}$/.test(id) && typeof title === "string" && !out.some((item) => item.id === id)) {
    out.push({ id, title: title.slice(0, 140) });
  }
  for (const value of Object.values(record)) videosFrom(value, out, depth + 1);
}

async function imageExists(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { "user-agent": UA } });
    if (!response.ok) return false;
    const length = Number(response.headers.get("content-length") || 0);
    if (length > 2000) return true;
    const bytes = await response.arrayBuffer();
    return bytes.byteLength > 2000;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export const checkMonetization = createServerFn({ method: "POST" })
  .validator(queryOf)
  .handler(async ({ data }): Promise<MonetizationReport> => {
    const profile = await publicYouTube(data);
    if (!profile) throw new Error("Could not read that channel. Paste a youtube.com link or @handle.");
    const eligible = profile.subscribers >= 1000;
    return {
      title: profile.title,
      handle: profile.handle,
      avatar: profile.avatar,
      subscribers: profile.subscribers,
      views: profile.views,
      videos: profile.videos,
      eligible,
      headline: eligible ? "Monetized" : "Not monetized",
      detail: eligible
        ? "This channel is past YouTube’s 1,000 subscriber requirement, so it can run ads."
        : "This channel is under 1,000 subscribers, so YouTube will not monetize it.",
    };
  });

export const listMedia = createServerFn({ method: "POST" })
  .validator(queryOf)
  .handler(async ({ data }): Promise<{ kind: "video" | "channel"; title: string; author: string; avatar: string; items: Thumb[] }> => {
    const id = videoId(data);
    if (id) {
      const raw = await getText(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`);
      const meta = raw ? (JSON.parse(raw) as { title?: string; author_name?: string }) : {};
      const sizes = [
        ["maxresdefault", "Max"],
        ["sddefault", "SD"],
        ["hqdefault", "HQ"],
        ["mqdefault", "MQ"],
        ["default", "Small"],
      ] as const;
      const items: Thumb[] = [];
      for (const [size, label] of sizes) {
        const url = `https://i.ytimg.com/vi/${id}/${size}.jpg`;
        if (await imageExists(url)) items.push({ id, title: meta.title || "Video thumbnail", url, label });
      }
      if (!items.length) throw new Error("No public thumbnail was found for that video.");
      return { kind: "video", title: meta.title || "YouTube video", author: meta.author_name || "", avatar: "", items };
    }

    const profile = await publicYouTube(data);
    const html = await getText(channelUrl(data));
    const parsed = html ? initialData(html) : null;
    const videos: Array<{ id: string; title: string }> = [];
    if (parsed) videosFrom(parsed, videos);
    const items: Thumb[] = [];
    if (profile?.avatar) items.push({ id: "avatar", title: `${profile.title} profile photo`, url: profile.avatar, label: "Profile" });
    for (const video of videos) {
      const url = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
      items.push({ id: video.id, title: video.title, url, label: "Thumbnail" });
    }
    if (!items.length) throw new Error("Could not find a profile photo or video thumbnails for that channel.");
    return {
      kind: "channel",
      title: profile?.title || "Channel",
      author: profile?.handle || "",
      avatar: profile?.avatar || "",
      items,
    };
  });

const IMAGE_HOSTS = ["i.ytimg.com", "yt3.googleusercontent.com", "yt3.ggpht.com"];

export const downloadMedia = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const url = String((data as { url?: unknown })?.url ?? "");
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new Error("That file link is not valid.");
    }
    if (parsed.protocol !== "https:" || !IMAGE_HOSTS.includes(parsed.hostname)) throw new Error("Only public YouTube images can be downloaded.");
    const name = String((data as { name?: unknown })?.name ?? "youtube-image.jpg").replace(/[^\w.-]+/g, "-").slice(0, 80);
    return { url, name: name || "youtube-image.jpg" };
  })
  .handler(async ({ data }) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(data.url, { signal: controller.signal, headers: { "user-agent": UA } });
      if (!response.ok) throw new Error("YouTube did not return that image.");
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 500 || bytes.length > 2_000_000) throw new Error("That image could not be saved.");
      const type = response.headers.get("content-type") || "image/jpeg";
      return { base64: bytes.toString("base64"), type, name: data.name.endsWith(".jpg") ? data.name : `${data.name}.jpg` };
    } finally {
      clearTimeout(timer);
    }
  });

function stamp(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(whole / 60);
  const remain = whole % 60;
  return `${minutes}:${String(remain).padStart(2, "0")}`;
}

function parseVtt(body: string): TranscriptLine[] {
  const lines: TranscriptLine[] = [];
  const blocks = body.replace(/\r/g, "").split(/\n\n+/);
  for (const block of blocks) {
    const rows = block.split("\n").filter((row) => row && !row.startsWith("WEBVTT") && !row.startsWith("NOTE") && !/^\d+$/.test(row));
    const timing = rows.find((row) => row.includes("-->"));
    if (!timing) continue;
    const start = timing.split("-->")[0]?.trim() || "0:00";
    const seconds = start.split(":").reduce((total, part) => total * 60 + Number(part), 0);
    const text = rows
      .filter((row) => row !== timing)
      .join(" ")
      .replace(/<[^>]+>/g, "")
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    const previous = lines[lines.length - 1];
    if (previous && (previous.text === text || text.startsWith(previous.text))) {
      previous.text = text;
      continue;
    }
    lines.push({ at: stamp(seconds), text });
  }
  return lines;
}

async function youtubeSession(): Promise<string> {
  const response = await fetch("https://www.youtube.com/", {
    headers: { "user-agent": UA, "accept-language": "en-US,en;q=0.9" },
  });
  return (response.headers.getSetCookie?.() || []).map((cookie) => cookie.split(";")[0]).join("; ");
}

function captionTracks(html: string): Array<{ languageCode?: string; kind?: string; name?: { simpleText?: string }; baseUrl?: string }> {
  const marker = '"captionTracks":';
  const start = html.indexOf(marker);
  if (start < 0) return [];
  const from = start + marker.length;
  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = from;
  for (; end < html.length; end += 1) {
    const char = html[end];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "[") depth += 1;
    else if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        end += 1;
        break;
      }
    }
  }
  try {
    return JSON.parse(html.slice(from, end)) as Array<{ languageCode?: string; kind?: string; name?: { simpleText?: string }; baseUrl?: string }>;
  } catch {
    return [];
  }
}

function parseJson3(body: string): TranscriptLine[] {
  const data = JSON.parse(body) as { events?: Array<{ tStartMs?: number; segs?: Array<{ utf8?: string }> }> };
  const lines: TranscriptLine[] = [];
  for (const event of data.events || []) {
    const text = (event.segs || []).map((seg) => seg.utf8 || "").join("").replace(/\s+/g, " ").trim();
    if (!text) continue;
    const previous = lines[lines.length - 1];
    if (previous && (previous.text === text || text.startsWith(previous.text))) {
      previous.text = text;
      continue;
    }
    lines.push({ at: stamp((event.tStartMs || 0) / 1000), text });
  }
  return lines;
}

function parseXml(body: string): TranscriptLine[] {
  const lines: TranscriptLine[] = [];
  for (const match of body.matchAll(/<text start="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g)) {
    const text = match[2]
      .replace(/<[^>]+>/g, "")
      .replace(/&/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/"/g, '"')
      .replace(/\s+/g, " ")
      .trim();
    if (text) lines.push({ at: stamp(Number(match[1])), text });
  }
  return lines;
}

function linesFromCaption(body: string): TranscriptLine[] {
  const trimmed = body.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("{")) return parseJson3(trimmed);
  if (trimmed.includes("<text")) return parseXml(trimmed);
  return parseVtt(trimmed);
}

const ANDROID_UA = "com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip";
const PLAYER_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";

async function androidTranscript(id: string): Promise<{ language: string; lines: TranscriptLine[] } | null> {
  try {
    const cookie = await youtubeSession();
    const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${PLAYER_KEY}&prettyPrint=false`, {
      method: "POST",
      signal: AbortSignal.timeout(12000),
      headers: {
        "content-type": "application/json",
        "user-agent": ANDROID_UA,
        "x-youtube-client-name": "3",
        "x-youtube-client-version": "20.10.38",
        cookie,
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "ANDROID",
            clientVersion: "20.10.38",
            androidSdkVersion: 30,
            hl: "en",
            gl: "US",
          },
        },
        videoId: id,
        contentCheckOk: true,
        racyCheckOk: true,
      }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      captions?: { playerCaptionsTracklistRenderer?: { captionTracks?: Array<{ languageCode?: string; kind?: string; name?: { simpleText?: string }; baseUrl?: string }> } };
    };
    const tracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
    const ordered = [
      ...tracks.filter((track) => track.languageCode === "en" && track.kind !== "asr"),
      ...tracks.filter((track) => track.languageCode === "en"),
      ...tracks,
    ];
    for (const track of ordered.slice(0, 3)) {
      if (!track.baseUrl) continue;
      const url = track.baseUrl.includes("fmt=") ? track.baseUrl.replace(/fmt=[^&]+/, "fmt=json3") : `${track.baseUrl}&fmt=json3`;
      const caption = await fetch(url, {
        signal: AbortSignal.timeout(12000),
        headers: { "user-agent": ANDROID_UA, cookie, referer: "https://www.youtube.com/" },
      });
      if (!caption.ok) continue;
      const lines = linesFromCaption(await caption.text());
      if (lines.length) return { language: track.name?.simpleText || "English", lines };
    }
  } catch {
    return null;
  }
  return null;
}

async function captionBody(id: string): Promise<{ language: string; lines: TranscriptLine[] } | null> {
  const spoken = await androidTranscript(id);
  if (spoken) return spoken;
  const cookie = await youtubeSession();
  const watch = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, {
    headers: { "user-agent": UA, "accept-language": "en-US,en;q=0.9", cookie, referer: "https://www.youtube.com/" },
  });
  const html = await watch.text();
  const tracks = captionTracks(html);
  const ordered = [...tracks.filter((track) => track.languageCode === "en" && track.kind !== "asr"), ...tracks.filter((track) => track.languageCode === "en"), ...tracks];
  for (const track of ordered.slice(0, 3)) {
    if (!track.baseUrl) continue;
    const response = await fetch(`${track.baseUrl}&fmt=json3`, {
      headers: { "user-agent": UA, cookie, referer: `https://www.youtube.com/watch?v=${id}` },
    });
    const body = await response.text();
    const lines = linesFromCaption(body);
    if (lines.length) return { language: track.name?.simpleText || track.languageCode || "Captions", lines };
  }

  const hosts = ["https://inv.nadeko.net"];
  for (const host of hosts) {
    const listRaw = await getText(`${host}/api/v1/captions/${id}`);
    if (!listRaw || !listRaw.includes("captions")) continue;
    let captions: Array<{ label?: string; languageCode?: string; url?: string }> = [];
    try {
      captions = (JSON.parse(listRaw) as { captions?: typeof captions }).captions || [];
    } catch {
      continue;
    }
    const fallback = [...captions.filter((item) => item.languageCode === "en"), ...captions];
    for (const track of fallback.slice(0, 3)) {
      if (!track.url) continue;
      const body = await getText(track.url.startsWith("http") ? track.url : `${host}${track.url}`);
      if (!body) continue;
      const lines = linesFromCaption(body);
      if (lines.length) return { language: track.label || track.languageCode || "Captions", lines };
    }
  }
  return null;
}

export async function fetchTranscript(q: string): Promise<Transcript> {
  const id = videoId(q);
  if (!id) throw new Error("Paste a YouTube video link, not a channel link.");
  const raw = await getText(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`);
  const meta = raw ? (JSON.parse(raw) as { title?: string; author_name?: string }) : {};
  const caption = await captionBody(id);
  if (!caption) throw new Error("This video has no speech track to transcribe.");
  return {
    title: meta.title || "YouTube video",
    author: meta.author_name || "",
    language: caption.language,
    lines: caption.lines,
    text: caption.lines.map((line) => line.text).join(" "),
  };
}

export const transcribeVideo = createServerFn({ method: "POST" })
  .validator(queryOf)
  .handler(async ({ data }) => fetchTranscript(data));
