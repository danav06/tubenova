import { t as createServerFn } from "./ssr.mjs";
import { r as publicYouTube } from "./lookup-JUmujsoI.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/youtube-tools-DlhEyIf1.js
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
function queryOf(data) {
	const q = String(data?.q ?? "").trim();
	if (!q || q.length > 400) throw new Error("Paste a YouTube link.");
	return q;
}
async function getText(url) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 9e3);
	try {
		const response = await fetch(url, {
			signal: controller.signal,
			headers: {
				"user-agent": UA,
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
function videoId(q) {
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
		if ([
			"shorts",
			"embed",
			"live",
			"v"
		].includes(parts[0] || "") && parts[1] && /^[\w-]{11}$/.test(parts[1])) return parts[1];
	} catch {}
	return null;
}
function channelUrl(q) {
	const raw = q.trim();
	if (raw.startsWith("@")) return `https://www.youtube.com/${raw}/videos`;
	if (/^UC[\w-]{20,}$/.test(raw)) return `https://www.youtube.com/channel/${raw}/videos`;
	try {
		const parts = new URL(raw.startsWith("http") ? raw : `https://${raw}`).pathname.split("/").filter(Boolean);
		if (parts[0]?.startsWith("@")) return `https://www.youtube.com/${parts[0]}/videos`;
		if (parts[0] === "channel" && parts[1]) return `https://www.youtube.com/channel/${parts[1]}/videos`;
		if (parts[0]) return `https://www.youtube.com/${parts[0]}/videos`;
	} catch {}
	return `https://www.youtube.com/@${raw.replace(/^@/, "")}/videos`;
}
function initialData(html) {
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
			else if (char === "\"") inString = false;
			continue;
		}
		if (char === "\"") inString = true;
		else if (char === "{") depth += 1;
		else if (char === "}") {
			depth -= 1;
			if (depth === 0) try {
				return JSON.parse(html.slice(start, i + 1));
			} catch {
				return null;
			}
		}
	}
	return null;
}
function videosFrom(node, out, depth = 0) {
	if (!node || typeof node !== "object" || depth > 22 || out.length >= 12) return;
	const record = node;
	const id = record.videoId;
	const titleNode = record.title;
	const title = titleNode?.runs?.[0]?.text || titleNode?.simpleText || titleNode?.content;
	if (typeof id === "string" && /^[\w-]{11}$/.test(id) && typeof title === "string" && !out.some((item) => item.id === id)) out.push({
		id,
		title: title.slice(0, 140)
	});
	for (const value of Object.values(record)) videosFrom(value, out, depth + 1);
}
async function imageExists(url) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 8e3);
	try {
		const response = await fetch(url, {
			signal: controller.signal,
			headers: { "user-agent": UA }
		});
		if (!response.ok) return false;
		if (Number(response.headers.get("content-length") || 0) > 2e3) return true;
		return (await response.arrayBuffer()).byteLength > 2e3;
	} catch {
		return false;
	} finally {
		clearTimeout(timer);
	}
}
var checkMonetization_createServerFn_handler = createServerRpc({
	id: "6bb8b06fddb8aac8afa67a853d71ee93019f05f70e5fdf895f5615ba956c6a4c",
	name: "checkMonetization",
	filename: "src/lib/youtube-tools.ts"
}, (opts) => checkMonetization.__executeServer(opts));
var checkMonetization = createServerFn({ method: "POST" }).validator(queryOf).handler(checkMonetization_createServerFn_handler, async ({ data }) => {
	const profile = await publicYouTube(data);
	if (!profile) throw new Error("Could not read that channel. Paste a youtube.com link or @handle.");
	const eligible = profile.subscribers >= 1e3;
	return {
		title: profile.title,
		handle: profile.handle,
		avatar: profile.avatar,
		subscribers: profile.subscribers,
		views: profile.views,
		videos: profile.videos,
		eligible,
		headline: eligible ? "Monetized" : "Not monetized",
		detail: eligible ? "This channel is past YouTube’s 1,000 subscriber requirement, so it can run ads." : "This channel is under 1,000 subscribers, so YouTube will not monetize it."
	};
});
var listMedia_createServerFn_handler = createServerRpc({
	id: "0d7181c95a821ce5f497f6a2cc112bea93778dee6bbb88c2607f176bb72ba7d2",
	name: "listMedia",
	filename: "src/lib/youtube-tools.ts"
}, (opts) => listMedia.__executeServer(opts));
var listMedia = createServerFn({ method: "POST" }).validator(queryOf).handler(listMedia_createServerFn_handler, async ({ data }) => {
	const id = videoId(data);
	if (id) {
		const raw = await getText(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`);
		const meta = raw ? JSON.parse(raw) : {};
		const sizes = [
			["maxresdefault", "Max"],
			["sddefault", "SD"],
			["hqdefault", "HQ"],
			["mqdefault", "MQ"],
			["default", "Small"]
		];
		const items = [];
		for (const [size, label] of sizes) {
			const url = `https://i.ytimg.com/vi/${id}/${size}.jpg`;
			if (await imageExists(url)) items.push({
				id,
				title: meta.title || "Video thumbnail",
				url,
				label
			});
		}
		if (!items.length) throw new Error("No public thumbnail was found for that video.");
		return {
			kind: "video",
			title: meta.title || "YouTube video",
			author: meta.author_name || "",
			avatar: "",
			items
		};
	}
	const profile = await publicYouTube(data);
	const html = await getText(channelUrl(data));
	const parsed = html ? initialData(html) : null;
	const videos = [];
	if (parsed) videosFrom(parsed, videos);
	const items = [];
	if (profile?.avatar) items.push({
		id: "avatar",
		title: `${profile.title} profile photo`,
		url: profile.avatar,
		label: "Profile"
	});
	for (const video of videos) {
		const url = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
		items.push({
			id: video.id,
			title: video.title,
			url,
			label: "Thumbnail"
		});
	}
	if (!items.length) throw new Error("Could not find a profile photo or video thumbnails for that channel.");
	return {
		kind: "channel",
		title: profile?.title || "Channel",
		author: profile?.handle || "",
		avatar: profile?.avatar || "",
		items
	};
});
var IMAGE_HOSTS = [
	"i.ytimg.com",
	"yt3.googleusercontent.com",
	"yt3.ggpht.com"
];
var downloadMedia_createServerFn_handler = createServerRpc({
	id: "157612dafa3b8793ced468f51feaa13bd72ac422bc78104dc7af3808bd74754d",
	name: "downloadMedia",
	filename: "src/lib/youtube-tools.ts"
}, (opts) => downloadMedia.__executeServer(opts));
var downloadMedia = createServerFn({ method: "POST" }).validator((data) => {
	const url = String(data?.url ?? "");
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		throw new Error("That file link is not valid.");
	}
	if (parsed.protocol !== "https:" || !IMAGE_HOSTS.includes(parsed.hostname)) throw new Error("Only public YouTube images can be downloaded.");
	return {
		url,
		name: String(data?.name ?? "youtube-image.jpg").replace(/[^\w.-]+/g, "-").slice(0, 80) || "youtube-image.jpg"
	};
}).handler(downloadMedia_createServerFn_handler, async ({ data }) => {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 1e4);
	try {
		const response = await fetch(data.url, {
			signal: controller.signal,
			headers: { "user-agent": UA }
		});
		if (!response.ok) throw new Error("YouTube did not return that image.");
		const bytes = Buffer.from(await response.arrayBuffer());
		if (bytes.length < 500 || bytes.length > 2e6) throw new Error("That image could not be saved.");
		const type = response.headers.get("content-type") || "image/jpeg";
		return {
			base64: bytes.toString("base64"),
			type,
			name: data.name.endsWith(".jpg") ? data.name : `${data.name}.jpg`
		};
	} finally {
		clearTimeout(timer);
	}
});
function stamp(seconds) {
	const whole = Math.max(0, Math.floor(seconds));
	const minutes = Math.floor(whole / 60);
	const remain = whole % 60;
	return `${minutes}:${String(remain).padStart(2, "0")}`;
}
function parseVtt(body) {
	const lines = [];
	const blocks = body.replace(/\r/g, "").split(/\n\n+/);
	for (const block of blocks) {
		const rows = block.split("\n").filter((row) => row && !row.startsWith("WEBVTT") && !row.startsWith("NOTE") && !/^\d+$/.test(row));
		const timing = rows.find((row) => row.includes("-->"));
		if (!timing) continue;
		const seconds = (timing.split("-->")[0]?.trim() || "0:00").split(":").reduce((total, part) => total * 60 + Number(part), 0);
		const text = rows.filter((row) => row !== timing).join(" ").replace(/<[^>]+>/g, "").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/\s+/g, " ").trim();
		if (!text) continue;
		const previous = lines[lines.length - 1];
		if (previous && (previous.text === text || text.startsWith(previous.text))) {
			previous.text = text;
			continue;
		}
		lines.push({
			at: stamp(seconds),
			text
		});
	}
	return lines;
}
async function youtubeSession() {
	return ((await fetch("https://www.youtube.com/", { headers: {
		"user-agent": UA,
		"accept-language": "en-US,en;q=0.9"
	} })).headers.getSetCookie?.() || []).map((cookie) => cookie.split(";")[0]).join("; ");
}
function captionTracks(html) {
	const start = html.indexOf("\"captionTracks\":");
	if (start < 0) return [];
	const from = start + 16;
	let depth = 0;
	let inString = false;
	let escaped = false;
	let end = from;
	for (; end < html.length; end += 1) {
		const char = html[end];
		if (inString) {
			if (escaped) escaped = false;
			else if (char === "\\") escaped = true;
			else if (char === "\"") inString = false;
			continue;
		}
		if (char === "\"") inString = true;
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
		return JSON.parse(html.slice(from, end));
	} catch {
		return [];
	}
}
function parseJson3(body) {
	const data = JSON.parse(body);
	const lines = [];
	for (const event of data.events || []) {
		const text = (event.segs || []).map((seg) => seg.utf8 || "").join("").replace(/\s+/g, " ").trim();
		if (!text) continue;
		const previous = lines[lines.length - 1];
		if (previous && (previous.text === text || text.startsWith(previous.text))) {
			previous.text = text;
			continue;
		}
		lines.push({
			at: stamp((event.tStartMs || 0) / 1e3),
			text
		});
	}
	return lines;
}
function parseXml(body) {
	const lines = [];
	for (const match of body.matchAll(/<text start="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g)) {
		const text = match[2].replace(/<[^>]+>/g, "").replace(/&/g, "&").replace(/&#39;/g, "'").replace(/"/g, "\"").replace(/\s+/g, " ").trim();
		if (text) lines.push({
			at: stamp(Number(match[1])),
			text
		});
	}
	return lines;
}
function linesFromCaption(body) {
	const trimmed = body.trim();
	if (!trimmed) return [];
	if (trimmed.startsWith("{")) return parseJson3(trimmed);
	if (trimmed.includes("<text")) return parseXml(trimmed);
	return parseVtt(trimmed);
}
var ANDROID_UA = "com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip";
var PLAYER_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
async function androidTranscript(id) {
	try {
		const cookie = await youtubeSession();
		const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${PLAYER_KEY}&prettyPrint=false`, {
			method: "POST",
			signal: AbortSignal.timeout(12e3),
			headers: {
				"content-type": "application/json",
				"user-agent": ANDROID_UA,
				"x-youtube-client-name": "3",
				"x-youtube-client-version": "20.10.38",
				cookie
			},
			body: JSON.stringify({
				context: { client: {
					clientName: "ANDROID",
					clientVersion: "20.10.38",
					androidSdkVersion: 30,
					hl: "en",
					gl: "US"
				} },
				videoId: id,
				contentCheckOk: true,
				racyCheckOk: true
			})
		});
		if (!response.ok) return null;
		const tracks = (await response.json()).captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
		const ordered = [
			...tracks.filter((track) => track.languageCode === "en" && track.kind !== "asr"),
			...tracks.filter((track) => track.languageCode === "en"),
			...tracks
		];
		for (const track of ordered.slice(0, 3)) {
			if (!track.baseUrl) continue;
			const url = track.baseUrl.includes("fmt=") ? track.baseUrl.replace(/fmt=[^&]+/, "fmt=json3") : `${track.baseUrl}&fmt=json3`;
			const caption = await fetch(url, {
				signal: AbortSignal.timeout(12e3),
				headers: {
					"user-agent": ANDROID_UA,
					cookie,
					referer: "https://www.youtube.com/"
				}
			});
			if (!caption.ok) continue;
			const lines = linesFromCaption(await caption.text());
			if (lines.length) return {
				language: track.name?.simpleText || "English",
				lines
			};
		}
	} catch {
		return null;
	}
	return null;
}
async function captionBody(id) {
	const spoken = await androidTranscript(id);
	if (spoken) return spoken;
	const cookie = await youtubeSession();
	const tracks = captionTracks(await (await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, { headers: {
		"user-agent": UA,
		"accept-language": "en-US,en;q=0.9",
		cookie,
		referer: "https://www.youtube.com/"
	} })).text());
	const ordered = [
		...tracks.filter((track) => track.languageCode === "en" && track.kind !== "asr"),
		...tracks.filter((track) => track.languageCode === "en"),
		...tracks
	];
	for (const track of ordered.slice(0, 3)) {
		if (!track.baseUrl) continue;
		const lines = linesFromCaption(await (await fetch(`${track.baseUrl}&fmt=json3`, { headers: {
			"user-agent": UA,
			cookie,
			referer: `https://www.youtube.com/watch?v=${id}`
		} })).text());
		if (lines.length) return {
			language: track.name?.simpleText || track.languageCode || "Captions",
			lines
		};
	}
	for (const host of ["https://inv.nadeko.net"]) {
		const listRaw = await getText(`${host}/api/v1/captions/${id}`);
		if (!listRaw || !listRaw.includes("captions")) continue;
		let captions = [];
		try {
			captions = JSON.parse(listRaw).captions || [];
		} catch {
			continue;
		}
		const fallback = [...captions.filter((item) => item.languageCode === "en"), ...captions];
		for (const track of fallback.slice(0, 3)) {
			if (!track.url) continue;
			const body = await getText(track.url.startsWith("http") ? track.url : `${host}${track.url}`);
			if (!body) continue;
			const lines = linesFromCaption(body);
			if (lines.length) return {
				language: track.label || track.languageCode || "Captions",
				lines
			};
		}
	}
	return null;
}
async function fetchTranscript(q) {
	const id = videoId(q);
	if (!id) throw new Error("Paste a YouTube video link, not a channel link.");
	const raw = await getText(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`);
	const meta = raw ? JSON.parse(raw) : {};
	const caption = await captionBody(id);
	if (!caption) throw new Error("This video has no speech track to transcribe.");
	return {
		title: meta.title || "YouTube video",
		author: meta.author_name || "",
		language: caption.language,
		lines: caption.lines,
		text: caption.lines.map((line) => line.text).join(" ")
	};
}
var transcribeVideo_createServerFn_handler = createServerRpc({
	id: "9aa93a05b635f92ad9b557c78f874ab92f5ee73a5e62acdabe032d2847f5d1fa",
	name: "transcribeVideo",
	filename: "src/lib/youtube-tools.ts"
}, (opts) => transcribeVideo.__executeServer(opts));
var transcribeVideo = createServerFn({ method: "POST" }).validator(queryOf).handler(transcribeVideo_createServerFn_handler, async ({ data }) => fetchTranscript(data));
//#endregion
export { checkMonetization_createServerFn_handler, downloadMedia_createServerFn_handler, listMedia_createServerFn_handler, transcribeVideo_createServerFn_handler };
