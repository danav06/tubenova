import { i as __toESM } from "../_runtime.mjs";
import { Y as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
import { n as writeExtraPosts, t as readExtraPosts } from "./studio-store-Cspcfdp4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-CntXMcIu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	slug: "",
	title: "",
	description: "",
	date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
	category: "Notes",
	minutes: 5,
	blocks: [{
		kind: "p",
		text: ""
	}]
});
function StudioPage() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)(empty);
	const [status, setStatus] = (0, import_react.useState)("Drafts stay in this browser and show up on the blog.");
	(0, import_react.useEffect)(() => {
		setPosts(readExtraPosts());
	}, []);
	function save(event) {
		event.preventDefault();
		const slug = draft.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
		if (!draft.title.trim() || !slug) {
			setStatus("Title and slug are required.");
			return;
		}
		const next = [{
			...draft,
			slug,
			title: draft.title.trim(),
			description: draft.description.trim() || draft.title.trim(),
			blocks: draft.blocks.filter((block) => block.text.trim())
		}, ...posts.filter((post) => post.slug !== slug)];
		writeExtraPosts(next);
		setPosts(next);
		setDraft(empty());
		setStatus("Saved. Open the blog to see it.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 pt-12 lg:grid-cols-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.18em] text-primary uppercase",
					children: "Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl tracking-tight",
					children: "Write the next post"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-6 text-muted",
					children: status
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-2",
					children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "w-full rounded-2xl border border-line px-4 py-3 text-left text-sm",
						onClick: () => setDraft(post),
						children: post.title
					}) }, post.slug))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "space-y-3 rounded-3xl border border-line bg-surface p-5 lg:col-span-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					value: draft.title,
					onChange: (title) => setDraft({
						...draft,
						title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Slug",
					value: draft.slug,
					onChange: (slug) => setDraft({
						...draft,
						slug
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description",
					value: draft.description,
					onChange: (description) => setDraft({
						...draft,
						description
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm text-muted",
					children: ["Body", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: draft.blocks.map((block) => block.text).join("\n\n"),
						onChange: (event) => setDraft({
							...draft,
							blocks: event.target.value.split(/\n\n+/).map((text) => ({
								kind: "p",
								text
							}))
						}),
						className: "mt-2 min-h-48 w-full rounded-2xl border border-line bg-bg px-4 py-3 text-base text-fg outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-full bg-primary px-5 font-semibold text-primary-ink",
						children: "Publish in this browser"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog",
						className: "inline-flex h-11 items-center text-sm text-primary",
						children: "View blog"
					})]
				})
			]
		})]
	}) });
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: "mt-2 h-12 w-full rounded-2xl border border-line bg-bg px-4 text-base text-fg outline-none"
		})]
	});
}
//#endregion
export { StudioPage as component };
