import { i as __toESM } from "../_runtime.mjs";
import { Y as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Check, t as X } from "../_libs/lucide-react.mjs";
import { a as checkMonetization } from "./router-NZge9WWz.mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
import { n as formatCount } from "./live-count-BY6VPgbZ.mjs";
import { t as ToolForm } from "./tool-form-D9lZe2kN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monetization-DFOH-J90.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MonetizationPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [report, setReport] = (0, import_react.useState)(null);
	async function run(raw) {
		const next = raw.trim();
		setQuery(next);
		if (!next) {
			setError("Paste a channel link first.");
			setReport(null);
			return;
		}
		setLoading(true);
		setError("");
		try {
			setReport(await checkMonetization({ data: { q: next } }));
		} catch (cause) {
			setReport(null);
			setError(cause instanceof Error ? cause.message : "Check failed.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 pt-12 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-primary uppercase",
				children: "YouTube"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-tight",
				children: "Is this channel monetized?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg leading-8 text-muted",
				children: "Paste a channel link. Under 1,000 subscribers it is not monetized. Past that bar it is marked monetized."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolForm, {
				label: "Channel link",
				placeholder: "https://www.youtube.com/@MrBeast",
				value: query,
				loading,
				button: "Check monetization",
				onChange: setQuery,
				onSubmit: (value) => void run(value)
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-coral",
				children: error
			}) : null,
			report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "profile-open mt-6 rounded-[32px] border border-white bg-white/90 p-6 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [report.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: report.avatar,
							alt: "",
							referrerPolicy: "no-referrer",
							className: "size-16 rounded-full object-cover"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-primary",
							children: report.handle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: report.title
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid size-14 place-items-center rounded-full ${report.eligible ? "bg-emerald-100 text-money" : "bg-rose-100 text-coral"}`,
							children: report.eligible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-8",
								strokeWidth: 3
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "size-8",
								strokeWidth: 3
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `font-display text-4xl ${report.eligible ? "text-money" : "text-coral"}`,
							children: report.headline
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Subscribers",
								value: formatCount(report.subscribers)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Required",
								value: "1,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Views",
								value: formatCount(report.views)
							})
						]
					})
				]
			}) : null
		]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface-2 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl",
			children: value
		})]
	});
}
//#endregion
export { MonetizationPage as component };
