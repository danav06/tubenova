import { i as __toESM } from "../_runtime.mjs";
import { n as findPost } from "./posts-Dl83ry_H.mjs";
import { K as redirect, Y as require_react, _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as lookupProfile, t as createSsrRpc } from "./lookup-JUmujsoI.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/youtube-tools-DqBRW1YA.js
function queryOf(data) {
	const q = String(data?.q ?? "").trim();
	if (!q || q.length > 400) throw new Error("Paste a YouTube link.");
	return q;
}
var checkMonetization = createServerFn({ method: "POST" }).validator(queryOf).handler(createSsrRpc("6bb8b06fddb8aac8afa67a853d71ee93019f05f70e5fdf895f5615ba956c6a4c"));
var listMedia = createServerFn({ method: "POST" }).validator(queryOf).handler(createSsrRpc("0d7181c95a821ce5f497f6a2cc112bea93778dee6bbb88c2607f176bb72ba7d2"));
var IMAGE_HOSTS = [
	"i.ytimg.com",
	"yt3.googleusercontent.com",
	"yt3.ggpht.com"
];
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
}).handler(createSsrRpc("157612dafa3b8793ced468f51feaa13bd72ac422bc78104dc7af3808bd74754d"));
var transcribeVideo = createServerFn({ method: "POST" }).validator(queryOf).handler(createSsrRpc("9aa93a05b635f92ad9b557c78f874ab92f5ee73a5e62acdabe032d2847f5d1fa"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-NZge9WWz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-BG8Fy_a4.css";
var APP_NAME = "TubeNova";
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Check YouTube stats, monetization, thumbnails, and transcripts."
			},
			{
				name: "theme-color",
				content: "#f4efe6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$11 = () => import("./routes-bbaW_cQL.mjs");
var Route$11 = createFileRoute("/")({
	validateSearch: (search) => ({ q: typeof search.q === "string" && search.q.trim() ? search.q : void 0 }),
	beforeLoad: ({ search }) => {
		const q = search.q?.trim();
		if (!q) return;
		throw redirect({
			to: "/youtube",
			search: { q }
		});
	},
	head: () => ({ meta: [{ title: "YouTube stats, thumbnails, and transcripts | TubeNova" }, {
		name: "description",
		content: "TubeNova is a YouTube toolkit. Check subscribers, monetization, thumbnails, and video transcripts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./about-CKas4ZWU.mjs");
var Route$10 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About TubeNova" }, {
		name: "description",
		content: "TubeNova is a YouTube toolkit for stats, monetization, thumbnails, and transcripts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./monetization-DFOH-J90.mjs");
var Route$9 = createFileRoute("/monetization")({
	head: () => ({ meta: [{ title: "Is this YouTube channel monetized? | TubeNova" }, {
		name: "description",
		content: "Check whether a YouTube channel is monetized. Channels under 1,000 subscribers are not."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./privacy-iNrtorgg.mjs");
var Route$8 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy | TubeNova" }, {
		name: "description",
		content: "How TubeNova handles lookups."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./studio-CntXMcIu.mjs");
var Route$7 = createFileRoute("/studio")({
	head: () => ({ meta: [{ title: "Studio | TubeNova" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./terms-DX6unuEX.mjs");
var Route$6 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms | TubeNova" }, {
		name: "description",
		content: "Terms for using TubeNova."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./thumbnails-B4MQsREO.mjs");
var Route$5 = createFileRoute("/thumbnails")({
	head: () => ({ meta: [{ title: "Download YouTube thumbnails and profile photos | TubeNova" }, {
		name: "description",
		content: "Download a YouTube video thumbnail or a channel profile photo from a public link."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./tools-_GCLujAU.mjs");
var Route$4 = createFileRoute("/tools")({
	head: () => ({ meta: [{ title: "YouTube tools | TubeNova" }, {
		name: "description",
		content: "Subscriber counts, monetization check, thumbnail downloads, and video transcripts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./transcript-MUkRM2fB.mjs");
var Route$3 = createFileRoute("/transcript")({
	validateSearch: (search) => ({ url: typeof search.url === "string" ? search.url : void 0 }),
	loaderDeps: ({ search }) => ({ url: search.url ?? "" }),
	loader: async ({ deps }) => {
		if (!deps.url.trim()) return {
			transcript: null,
			error: ""
		};
		try {
			return {
				transcript: await transcribeVideo({ data: { q: deps.url } }),
				error: ""
			};
		} catch (cause) {
			return {
				transcript: null,
				error: cause instanceof Error ? cause.message : "Transcript failed. Try that link again."
			};
		}
	},
	head: () => ({ meta: [{ title: "YouTube video transcript generator | TubeNova" }, {
		name: "description",
		content: "Paste a YouTube video link and get the spoken words as paragraphs."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./youtube-Bwh59tP7.mjs");
var Route$2 = createFileRoute("/youtube")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : void 0 }),
	loaderDeps: ({ search }) => ({ q: search.q ?? "" }),
	loader: async ({ deps }) => {
		if (!deps.q) return null;
		try {
			return await lookupProfile({ data: {
				platform: "youtube",
				q: deps.q
			} });
		} catch {
			return null;
		}
	},
	head: () => ({ meta: [{ title: "YouTube subscriber count checker | TubeNova" }, {
		name: "description",
		content: "Free YouTube subscriber count checker. Paste a channel URL or @handle to see subscribers, views, and videos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./blog-DdNDomfJ.mjs");
var Route$1 = createFileRoute("/blog/")({
	head: () => ({ meta: [{ title: "Social media insights blog | TubeNova" }, {
		name: "description",
		content: "Guides on YouTube subscriber counts, rounding, and public channel stats."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-Chui8Mvn.mjs");
var Route = createFileRoute("/blog/$slug")({
	head: ({ params }) => {
		const post = findPost(params.slug);
		return { meta: [{ title: post ? `${post.title} | TubeNova` : "Article | TubeNova" }, {
			name: "description",
			content: post?.description ?? "TubeNova article"
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var AboutRoute = Route$10.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$12
});
var MonetizationRoute = Route$9.update({
	id: "/monetization",
	path: "/monetization",
	getParentRoute: () => Route$12
});
var PrivacyRoute = Route$8.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$12
});
var StudioRoute = Route$7.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$12
});
var TermsRoute = Route$6.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$12
});
var ThumbnailsRoute = Route$5.update({
	id: "/thumbnails",
	path: "/thumbnails",
	getParentRoute: () => Route$12
});
var ToolsRoute = Route$4.update({
	id: "/tools",
	path: "/tools",
	getParentRoute: () => Route$12
});
var TranscriptRoute = Route$3.update({
	id: "/transcript",
	path: "/transcript",
	getParentRoute: () => Route$12
});
var YoutubeRoute = Route$2.update({
	id: "/youtube",
	path: "/youtube",
	getParentRoute: () => Route$12
});
var BlogIndexRoute = Route$1.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$12
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	MonetizationRoute,
	PrivacyRoute,
	StudioRoute,
	TermsRoute,
	ThumbnailsRoute,
	ToolsRoute,
	TranscriptRoute,
	YoutubeRoute,
	BlogSlugRoute: Route.update({
		id: "/blog/$slug",
		path: "/blog/$slug",
		getParentRoute: () => Route$12
	}),
	BlogIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { checkMonetization as a, Route$3 as i, Route as n, downloadMedia as o, Route$2 as r, listMedia as s, router_exports as t };
