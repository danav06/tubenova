import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2 } from "./router-NZge9WWz.mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
import { t as LookupPanel } from "./lookup-panel-DCA_4EJX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/youtube-Bwh59tP7.js
var import_jsx_runtime = require_jsx_runtime();
function YouTubePage() {
	const { q } = Route$2.useSearch();
	const profile = Route$2.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 pt-12 pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-primary uppercase",
				children: "YouTube"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 max-w-2xl font-display text-5xl tracking-tight sm:text-6xl",
				children: ["The count, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gradient-text italic",
					children: "on stage."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg leading-7 text-muted",
				children: "Paste a channel URL or @handle. A rounded card opens underneath with the public photo and live counts."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupPanel, {
					platform: "youtube",
					initialQuery: q ?? "",
					initialProfile: profile
				}, q ?? "")
			})
		]
	}) });
}
//#endregion
export { YouTubePage as component };
