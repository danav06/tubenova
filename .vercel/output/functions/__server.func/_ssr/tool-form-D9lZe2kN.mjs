import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tool-form-D9lZe2kN.js
var import_jsx_runtime = require_jsx_runtime();
function ToolForm({ label, placeholder, value, loading, button, onChange, onSubmit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: "dock mt-8",
		onSubmit: (event) => {
			event.preventDefault();
			const field = event.currentTarget.elements.namedItem("q");
			onSubmit((field instanceof HTMLInputElement ? field.value : value).trim());
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dock-inner flex flex-col gap-3 p-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "sr-only",
					htmlFor: "tool-q",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "tool-q",
					name: "q",
					suppressHydrationWarning: true,
					value,
					enterKeyHint: "search",
					onChange: (event) => onChange(event.target.value),
					placeholder,
					className: "h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: loading,
					className: "btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white disabled:opacity-70",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, button]
				})
			]
		})
	});
}
//#endregion
export { ToolForm as t };
