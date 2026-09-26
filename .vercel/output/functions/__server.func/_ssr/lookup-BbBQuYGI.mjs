import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookup-BbBQuYGI.js
var PLATFORMS = ["youtube"];
function parseInput(data) {
	if (!data || typeof data !== "object") throw new Error("Paste a profile link.");
	const raw = data;
	if (!PLATFORMS.includes(raw.platform)) throw new Error("Unknown platform.");
	const q = String(raw.q ?? "").trim();
	if (!q || q.length > 400) throw new Error("Paste a channel, profile, or page link.");
	return {
		platform: raw.platform,
		q
	};
}
function hash(value) {
	let h = 2166136261;
	for (const char of value.toLowerCase()) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
	return h >>> 0;
}
function handleOf(q, platform) {
	const trimmed = q.trim();
	try {
		const parts = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`).pathname.split("/").filter(Boolean);
		const first = (parts[0] || "").replace(/^@/, "");
		if (first && first !== "channel" && first !== "c" && first !== "user" && first !== "about") return `@${first}`;
		if (parts[1]) return `@${parts[1].replace(/^@/, "")}`;
	} catch {}
	const plain = trimmed.replace(/^@/, "").replace(/\s+/g, "");
	return plain ? `@${plain}` : platform === "youtube" ? "@channel" : "@profile";
}
function compactNumber(text) {
	const match = text.replace(/,/g, "").match(/([\d.]+)\s*([KMB])?/i);
	if (!match) return 0;
	const amount = Number(match[1]);
	if (!Number.isFinite(amount)) return 0;
	const unit = (match[2] || "").toUpperCase();
	return Math.round(amount * (unit === "B" ? 1e9 : unit === "M" ? 1e6 : unit === "K" ? 1e3 : 1));
}
function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function youtubeVideoCount(html, subscribersText) {
	const exact = html.match(/"videoCountText":"([^"]*\d[^"]*)"/)?.[1];
	if (exact) return compactNumber(exact);
	if (subscribersText) {
		const paired = html.match(new RegExp(`${escapeRegExp(subscribersText)}[\\s\\S]{0,700}?"content":"([^"]*\\bvideos)"`, "i"))?.[1];
		if (paired && /\d/.test(paired)) return compactNumber(paired);
	}
	return 0;
}
function moneyRange(views, subscribers) {
	const basis = views > 0 ? views : subscribers * 80;
	return {
		revenueLow: Math.round(basis / 1e3 * .25),
		revenueHigh: Math.round(basis / 1e3 * 4),
		revenueLabel: "Est. lifetime ad revenue"
	};
}
function avatarFor(handle, photo = "") {
	if (photo.startsWith("http") || photo.startsWith("data:image/")) return photo;
	return `https://unavatar.io/youtube/${encodeURIComponent(handle.replace(/^@/, "") || "channel")}`;
}
function finish(profile) {
	return {
		...profile,
		avatar: avatarFor(profile.handle, profile.avatar),
		...moneyRange(profile.views, profile.subscribers)
	};
}
function meta(html, key) {
	const match = html.match(new RegExp(`${key}" content="([^"]+)"`));
	return match?.[1] ? decode(match[1]) : "";
}
function decode(value) {
	return value.replace(/&/g, "&").replace(/"/g, "\"").replace(/&#39;/g, "'").replace(/</g, "<").replace(/>/g, ">");
}
function youtubeAboutUrl(q) {
	const raw = q.trim();
	if (raw.startsWith("@")) return `https://www.youtube.com/${raw}/about`;
	if (/^UC[\w-]{20,}$/.test(raw)) return `https://www.youtube.com/channel/${raw}/about`;
	try {
		const parts = new URL(raw.startsWith("http") ? raw : `https://${raw}`).pathname.split("/").filter(Boolean);
		if (parts[0] === "channel" && parts[1]) return `https://www.youtube.com/channel/${parts[1]}/about`;
		if (parts[0] === "user" && parts[1]) return `https://www.youtube.com/user/${parts[1]}/about`;
		if (parts[0] === "c" && parts[1]) return `https://www.youtube.com/c/${parts[1]}/about`;
		if (parts[0]?.startsWith("@")) return `https://www.youtube.com/${parts[0]}/about`;
		if (parts[0]) return `https://www.youtube.com/${parts[0]}/about`;
	} catch {}
	return `https://www.youtube.com/@${raw.replace(/^@/, "")}/about`;
}
async function fetchHtml(url) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 9e3);
	try {
		const response = await fetch(url, {
			signal: controller.signal,
			redirect: "follow",
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
				"accept-language": "en-US,en;q=0.9"
			}
		});
		if (!response.ok) return null;
		return await response.text();
	} catch {
		return null;
	} finally {
		clearTimeout(timer);
	}
}
async function publicYouTube(q) {
	const html = await fetchHtml(youtubeAboutUrl(q));
	if (!html || !html.includes("subscriberCountText")) return null;
	const subscribersText = html.match(/"subscriberCountText":"([^"]+)"/)?.[1] || "";
	const viewsText = html.match(/"viewCountText":"([^"]+)"/)?.[1] || "";
	const subscribers = compactNumber(subscribersText);
	if (!subscribers) return null;
	const joined = html.match(/"joinedDateText":\{"content":"([^"]+)"/)?.[1]?.replace(/^Joined\s+/i, "") || "—";
	const country = html.match(/"country":"([^"]+)"/)?.[1] || "—";
	const channelId = html.match(/"canonicalChannelUrl":"[^"]+","channelId":"(UC[\w-]{20,})"/)?.[1] || html.match(/"channelId":"(UC[\w-]{20,})"/)?.[1] || "";
	const canonical = html.match(/"canonicalChannelUrl":"([^"]+)"/)?.[1] || "";
	const handle = canonical.includes("@") ? `@${canonical.split("@").pop()}` : handleOf(q, "youtube");
	const title = meta(html, "og:title").replace(/\s+-\s+YouTube$/, "") || handle.replace(/^@/, "");
	const description = meta(html, "og:description").replace(/\s+/g, " ").slice(0, 280);
	return finish({
		platform: "youtube",
		id: channelId || handle,
		title,
		handle,
		description,
		country,
		publishedAt: joined,
		subscribers,
		views: compactNumber(viewsText),
		videos: youtubeVideoCount(html, subscribersText),
		hidden: false,
		avatar: meta(html, "og:image"),
		source: "youtube-public",
		note: "Public YouTube figures. Subscriber and video counts are abbreviated by YouTube."
	});
}
var KNOWN = [{
	keys: ["mrbeast", "ucx6oq3dkcsbyne6h8uqquva"],
	title: "MrBeast",
	handle: "@MrBeast",
	subscribers: 518e6,
	views: 140897016358,
	videos: 1e3,
	country: "United States",
	publishedAt: "Feb 19, 2012",
	description: "Public-style snapshot used only if the live page cannot be read."
}];
function previewProfile(platform, q) {
	const needle = q.toLowerCase();
	const known = KNOWN.find((item) => item.keys.some((key) => needle.includes(key)));
	if (known) return finish({
		platform,
		id: "preview-known",
		title: known.title,
		handle: known.handle,
		description: known.description,
		country: known.country,
		publishedAt: known.publishedAt,
		subscribers: known.subscribers,
		views: known.views,
		videos: known.videos,
		hidden: false,
		source: "preview",
		note: "Saved snapshot because the live page did not respond."
	});
	const seed = hash(`${platform}:${q}`);
	const handle = handleOf(q, platform);
	const pretty = handle.replace(/^@/, "").replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
	const subscribers = 1200 + seed % 84e5;
	return finish({
		platform,
		id: `preview-${seed.toString(16)}`,
		title: pretty || "Channel",
		handle,
		description: "Live YouTube page was unavailable, so this card is a stable preview.",
		country: "—",
		publishedAt: "—",
		subscribers,
		views: subscribers * (18 + seed % 40),
		videos: 12 + seed % 640,
		hidden: false,
		source: "preview",
		note: "Preview numbers. The live YouTube page was unavailable."
	});
}
async function officialYouTube(q, key) {
	const raw = q.trim();
	const part = "snippet,statistics";
	let url = "";
	if (/^UC[\w-]{20,}$/.test(raw)) url = `https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${encodeURIComponent(raw)}&key=${key}`;
	else {
		let handle = raw.startsWith("@") ? raw.slice(1) : "";
		if (!handle) try {
			const parts = new URL(raw.startsWith("http") ? raw : `https://${raw}`).pathname.split("/").filter(Boolean);
			if (parts[0] === "channel" && parts[1]) url = `https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${encodeURIComponent(parts[1])}&key=${key}`;
			else if (parts[0]?.startsWith("@")) handle = parts[0].slice(1);
			else if (parts[0] === "user" && parts[1]) url = `https://www.googleapis.com/youtube/v3/channels?part=${part}&forUsername=${encodeURIComponent(parts[1])}&key=${key}`;
			else if (parts[0]) handle = parts[0];
		} catch {
			handle = raw.replace(/^@/, "");
		}
		if (!url && handle) url = `https://www.googleapis.com/youtube/v3/channels?part=${part}&forHandle=${encodeURIComponent(handle)}&key=${key}`;
	}
	if (!url) return null;
	const response = await fetch(url);
	const data = await response.json();
	if (!response.ok) throw new Error(data.error?.message || "YouTube lookup failed.");
	const item = data.items?.[0];
	if (!item) return null;
	const stats = item.statistics || {};
	const snippet = item.snippet || {};
	const thumbs = snippet.thumbnails;
	return finish({
		platform: "youtube",
		id: item.id,
		title: snippet.title || "Channel",
		handle: snippet.customUrl || handleOf(q, "youtube"),
		description: (snippet.description || "").slice(0, 280),
		country: snippet.country || "—",
		publishedAt: (snippet.publishedAt || "").slice(0, 10) || "—",
		subscribers: Number(stats.subscriberCount || 0),
		views: Number(stats.viewCount || 0),
		videos: Number(stats.videoCount || 0),
		hidden: Boolean(stats.hiddenSubscriberCount),
		avatar: thumbs?.high?.url || thumbs?.medium?.url || thumbs?.default?.url || "",
		source: "youtube-data-api",
		note: stats.hiddenSubscriberCount ? "This channel hides its subscriber count." : "Official YouTube Data API. Counts above 1,000 subscribers are rounded."
	});
}
var lookupProfile_createServerFn_handler = createServerRpc({
	id: "3af9e5c9a091c8db0961a8388b3006ee3655ac9f4e1150238a16d9fead7855ba",
	name: "lookupProfile",
	filename: "src/lib/lookup.ts"
}, (opts) => lookupProfile.__executeServer(opts));
var lookupProfile = createServerFn({ method: "POST" }).validator(parseInput).handler(lookupProfile_createServerFn_handler, async ({ data }) => {
	const key = process.env.YOUTUBE_API_KEY;
	if (key) {
		const live = await officialYouTube(data.q, key);
		if (live) return live;
		throw new Error("No YouTube channel matched that link.");
	}
	const pub = await publicYouTube(data.q);
	if (pub) return pub;
	return previewProfile(data.platform, data.q);
});
//#endregion
export { lookupProfile_createServerFn_handler };
