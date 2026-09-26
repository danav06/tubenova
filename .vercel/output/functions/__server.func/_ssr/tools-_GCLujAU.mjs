import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-_GCLujAU.js
var import_jsx_runtime = require_jsx_runtime();
var TOOLS = [
	{
		to: "/youtube",
		title: "Subscriber count",
		body: "Photo, subscribers, views, and videos."
	},
	{
		to: "/monetization",
		title: "Monetization check",
		body: "See if a channel clears the 1,000-subscriber bar YouTube requires before ads."
	},
	{
		to: "/thumbnails",
		title: "Thumbnails and profile photo",
		body: "Download a video thumbnail, or a channel photo and recent thumbnails."
	},
	{
		to: "/transcript",
		title: "Video transcript",
		body: "Paste a video link and read the caption track made from the audio."
	}
];
function ToolsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 pt-12 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-primary uppercase",
				children: "YouTube tools"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-tight",
				children: "More than a subscriber count."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: TOOLS.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tool.to,
					className: "lift-card rounded-[28px] border border-white bg-white/85 p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: tool.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-muted",
						children: tool.body
					})]
				}, tool.to))
			})
		]
	}) });
}
//#endregion
export { ToolsPage as component };
