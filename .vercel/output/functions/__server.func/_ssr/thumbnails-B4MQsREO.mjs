import { i as __toESM } from "../_runtime.mjs";
import { Y as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as downloadMedia, s as listMedia } from "./router-NZge9WWz.mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
import { t as ToolForm } from "./tool-form-D9lZe2kN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/thumbnails-B4MQsREO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function saveBase64(base64, type, name) {
	const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
	const url = URL.createObjectURL(new Blob([bytes], { type }));
	const link = document.createElement("a");
	link.href = url;
	link.download = name;
	link.click();
	URL.revokeObjectURL(url);
}
function ThumbnailsPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)("");
	async function run(raw) {
		const next = raw.trim();
		setQuery(next);
		if (!next) {
			setError("Paste a video or channel link first.");
			setItems([]);
			return;
		}
		setLoading(true);
		setError("");
		try {
			const result = await listMedia({ data: { q: next } });
			setTitle(result.title);
			setItems(result.items);
		} catch (cause) {
			setItems([]);
			setError(cause instanceof Error ? cause.message : "Lookup failed.");
		} finally {
			setLoading(false);
		}
	}
	async function save(item) {
		setBusy(item.url);
		try {
			const file = await downloadMedia({ data: {
				url: item.url,
				name: item.title
			} });
			saveBase64(file.base64, file.type, file.name);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Download failed.");
		} finally {
			setBusy("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 pt-12 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-primary uppercase",
				children: "YouTube"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-tight",
				children: "Thumbnails and profile photos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg leading-8 text-muted",
				children: "Paste a video link to download its thumbnail, or a channel link to download the profile photo and recent video thumbnails."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolForm, {
				label: "YouTube link",
				placeholder: "Video or channel link",
				value: query,
				loading,
				button: "Find images",
				onChange: setQuery,
				onSubmit: (value) => void run(value)
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-coral",
				children: error
			}) : null,
			title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-3xl",
				children: title
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-[28px] border border-white bg-white/90 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.url,
						alt: "",
						referrerPolicy: "no-referrer",
						className: "aspect-video w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide text-primary uppercase",
								children: item.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-glow mt-3 inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-white",
								onClick: () => void save(item),
								children: busy === item.url ? "Saving…" : "Download"
							})
						]
					})]
				}, `${item.id}-${item.label}`))
			})
		]
	}) });
}
//#endregion
export { ThumbnailsPage as component };
