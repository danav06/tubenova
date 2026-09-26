import { i as __toESM } from "../_runtime.mjs";
import { Y as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as lookupProfile } from "./lookup-JUmujsoI.mjs";
import { a as LoaderCircle, r as Search } from "../_libs/lucide-react.mjs";
import { n as formatCount, t as LiveCount } from "./live-count-BY6VPgbZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookup-panel-DCA_4EJX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLACEHOLDERS = { youtube: "https://www.youtube.com/@MrBeast" };
function LookupPanel({ platform, initialQuery, initialProfile = null }) {
	const [query, setQuery] = (0, import_react.useState)(initialQuery);
	const [profile, setProfile] = (0, import_react.useState)(initialProfile);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(Boolean(initialQuery.trim()) && !initialProfile);
	async function run(next) {
		const trimmed = next.trim();
		if (!trimmed) {
			setError("Paste a channel, profile, or page link.");
			return;
		}
		setQuery(trimmed);
		setLoading(true);
		setError("");
		try {
			const result = await lookupProfile({ data: {
				platform,
				q: trimmed
			} });
			setProfile(result);
		} catch (cause) {
			setProfile(null);
			setError(cause instanceof Error ? cause.message : "Lookup failed. Try again.");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		if (initialProfile || !initialQuery.trim()) return;
		run(initialQuery);
	}, [
		initialQuery,
		platform,
		initialProfile
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "dock",
			onSubmit: (event) => {
				event.preventDefault();
				run(query);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dock-inner flex flex-col gap-3 p-2 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "lookup",
						children: "Profile link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "lookup",
						suppressHydrationWarning: true,
						value: query,
						enterKeyHint: "search",
						onChange: (event) => setQuery(event.target.value),
						onKeyDown: (event) => {
							if (event.key !== "Enter") return;
							event.preventDefault();
							run(event.currentTarget.value);
						},
						placeholder: PLACEHOLDERS[platform],
						className: "h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base text-fg outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void run(query),
						className: "btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white",
						children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), "Check stats"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted",
			children: "Press Enter or click Check stats."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "card-enter mt-4 rounded-2xl border border-coral/30 bg-white px-4 py-3 text-sm text-coral",
			children: error
		}) : null,
		loading && !profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "profile-open mt-4 flex items-center gap-3 rounded-[28px] border border-white bg-white px-5 py-6 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: "Checking live stats…"
			})]
		}) : null,
		profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
			profile,
			platform
		}) : null
	] });
}
function ProfileCard({ profile, platform }) {
	const [photoOk, setPhotoOk] = (0, import_react.useState)(true);
	const initial = (profile.title || "?").slice(0, 1).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "profile-open lift-card relative mt-4 overflow-hidden rounded-[32px] border border-white bg-white/90 shadow-[0_30px_80px_-36px_rgba(42,33,64,0.45)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 bg-gradient-to-r from-primary via-pink to-sun" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative size-28 shrink-0",
					children: photoOk && profile.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.avatar,
						alt: "",
						referrerPolicy: "no-referrer",
						onError: () => setPhotoOk(false),
						className: "size-28 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-28 place-items-center rounded-full bg-primary font-display text-3xl text-white",
						children: initial
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "live-dot inline-flex items-center text-xs font-semibold tracking-[0.16em] text-money uppercase",
							children: profile.hidden ? "Public profile" : profile.source === "preview" ? "Preview" : "Live"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 truncate font-display text-3xl tracking-tight",
							children: profile.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-primary",
							children: profile.handle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-3 text-sm leading-6 text-muted",
							children: profile.description
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: platform === "youtube" ? "Subscribers" : "Followers",
						delay: "40ms",
						children: profile.hidden ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCount, {
							value: profile.subscribers,
							pulse: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Views",
						delay: "100ms",
						children: profile.hidden || !profile.views ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCount, { value: profile.views })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: platform === "youtube" ? "Videos" : "Posts",
						delay: "160ms",
						children: profile.hidden ? "—" : formatCount(profile.videos)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Joined",
						delay: "220ms",
						children: profile.publishedAt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Country",
						delay: "280ms",
						children: profile.country
					})
				]
			})
		]
	}, `${profile.id}-${profile.title}`);
}
function Stat({ label, children, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stat-enter rounded-2xl border border-line bg-surface-2/80 px-4 py-4",
		style: { animationDelay: delay },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-2xl tracking-tight text-fg",
			children
		})]
	});
}
//#endregion
export { ProfileCard as n, LookupPanel as t };
