import { i as __toESM } from "../_runtime.mjs";
import { Y as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$3 } from "./router-NZge9WWz.mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transcript-MUkRM2fB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TranscriptPage() {
	const { url = "" } = Route$3.useSearch();
	const { transcript, error } = Route$3.useLoaderData();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const paragraphs = transcript ? toParagraphs(transcript.lines.map((line) => line.text)) : [];
	function download() {
		if (!transcript) return;
		const body = paragraphs.join("\n\n");
		const file = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
		const link = document.createElement("a");
		link.href = file;
		link.download = `${transcript.title.replace(/[^\w.-]+/g, "-").slice(0, 60) || "transcript"}.txt`;
		link.click();
		URL.revokeObjectURL(file);
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
				children: "Video transcript"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg leading-8 text-muted",
				children: "Paste a video link. TubeNova turns the spoken audio into text."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "dock mt-8",
				method: "get",
				action: "/transcript",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dock-inner flex flex-col gap-3 p-2 sm:flex-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "tool-q",
							children: "Video link"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "tool-q",
							name: "url",
							defaultValue: url,
							placeholder: "https://www.youtube.com/watch?v=...",
							className: "h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base outline-none"
						}, url),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white",
							children: "Get transcript"
						})
					]
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm font-semibold text-coral",
				children: error
			}) : null,
			transcript ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "profile-open mt-6 rounded-[32px] border border-white bg-white/90 p-6 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: transcript.author
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: transcript.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs tracking-wide text-muted uppercase",
						children: transcript.language
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-glow h-10 rounded-full px-4 text-sm font-semibold text-white",
							onClick: () => void navigator.clipboard.writeText(paragraphs.join("\n\n")).then(() => setCopied(true)),
							children: copied ? "Copied" : "Copy text"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-10 rounded-full border border-line bg-white px-4 text-sm font-semibold",
							onClick: download,
							children: "Download .txt"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 max-h-[32rem] space-y-4 overflow-auto pr-2",
						children: paragraphs.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base leading-8 text-fg",
							children: paragraph
						}, paragraph.slice(0, 48)))
					})
				]
			}) : null
		]
	}) });
}
function toParagraphs(parts) {
	const speech = parts.join(" ").replace(/\s+/g, " ").trim();
	if (!speech) return [];
	const sentences = speech.split(/(?<=[.!?])\s+/).filter(Boolean);
	if (sentences.length < 4) return [speech];
	const paragraphs = [];
	for (let index = 0; index < sentences.length; index += 3) paragraphs.push(sentences.slice(index, index + 3).join(" "));
	return paragraphs;
}
//#endregion
export { TranscriptPage as component };
