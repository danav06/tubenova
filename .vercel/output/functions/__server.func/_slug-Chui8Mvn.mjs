import { i as __toESM } from "./_runtime.mjs";
import { n as findPost } from "./_ssr/posts-Dl83ry_H.mjs";
import { Y as require_react, x as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-NZge9WWz.mjs";
import { t as Shell } from "./_ssr/shell-CraOwRKs.mjs";
import { t as readExtraPosts } from "./_ssr/studio-store-Cspcfdp4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Chui8Mvn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { slug } = Route.useParams();
	const builtIn = findPost(slug);
	const [extra, setExtra] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (builtIn) return;
		setExtra(readExtraPosts().find((post) => post.slug === slug) ?? null);
	}, [builtIn, slug]);
	const post = builtIn ?? extra;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 pt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/blog",
			className: "text-sm text-primary",
			children: "All posts"
		}), post ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-xs tracking-wide text-muted uppercase",
				children: [
					post.date,
					" · ",
					post.minutes,
					" min · ",
					post.category
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-tight tracking-tight",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-4 text-base leading-7 text-fg/90",
				children: post.blocks.map((block, index) => block.kind === "h2" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "pt-4 font-display text-2xl text-fg",
					children: block.text
				}, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: block.text }, index))
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-muted",
			children: "That post is not here. It may only exist in this browser’s Studio drafts."
		})]
	}) });
}
//#endregion
export { ArticlePage as component };
