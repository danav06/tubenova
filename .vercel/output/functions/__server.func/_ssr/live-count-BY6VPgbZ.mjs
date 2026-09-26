import { i as __toESM } from "../_runtime.mjs";
import { Y as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-count-BY6VPgbZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatCount(value) {
	if (!Number.isFinite(value)) return "—";
	return new Intl.NumberFormat("en-US").format(Math.floor(value));
}
function formatMoney(value) {
	if (!Number.isFinite(value)) return "—";
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
}
function LiveCount({ value, pulse = true, money = false }) {
	const [shown, setShown] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		setShown(value);
	}, [value]);
	(0, import_react.useEffect)(() => {
		if (!pulse) return;
		const step = Math.max(1, Math.round(value * 4e-7));
		const id = window.setInterval(() => {
			setShown((current) => Math.max(0, current + Math.round((Math.random() - .35) * step)));
		}, 1600);
		return () => window.clearInterval(id);
	}, [pulse, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: money ? formatMoney(shown) : formatCount(shown)
	});
}
//#endregion
export { formatCount as n, LiveCount as t };
