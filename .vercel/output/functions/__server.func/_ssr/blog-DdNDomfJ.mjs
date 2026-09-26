import { i as __toESM } from "../_runtime.mjs";
import { t as POSTS } from "./posts-Dl83ry_H.mjs";
import { Y as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
import { t as readExtraPosts } from "./studio-store-Cspcfdp4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-DdNDomfJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlogIndex() {
	const [extra, setExtra] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setExtra(readExtraPosts());
	}, []);
	const posts = [...extra, ...POSTS];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-primary uppercase",
				children: "Editorial"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-tight sm:text-6xl",
				children: "Signals from the public count."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-muted",
				children: "Practical explainers that answer the search, then send you into a live lookup."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: post.slug },
					className: "lift-card rounded-[28px] border border-white bg-white/85 p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								post.date,
								" · ",
								post.category
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl leading-tight",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-6 text-muted",
							children: post.description
						})
					]
				}, post.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studio",
					className: "text-primary",
					children: "Write a post in Studio"
				})
			})
		]
	}) });
}
//#endregion
export { BlogIndex as component };
