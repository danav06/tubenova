import { i as __toESM } from "../_runtime.mjs";
import { Y as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Menu, o as ChevronDown, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-CraOwRKs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LogoMark({ className = "size-9" }) {
	const raw = (0, import_react.useId)().replace(/:/g, "");
	const paint = `paint${raw}`;
	const shine = `shine${raw}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: paint,
				x1: "6",
				y1: "4",
				x2: "58",
				y2: "60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#6d3dff"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.46",
						stopColor: "#ff4d6d"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#f0b429"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: shine,
				cx: "32%",
				cy: "28%",
				r: "55%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0",
					stopColor: "#ffffff",
					stopOpacity: "0.7"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#ffffff",
					stopOpacity: "0"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "30",
				fill: "none",
				stroke: `url(#${paint})`,
				strokeWidth: "2.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "24.5",
				fill: `url(#${paint})`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "24.5",
				fill: `url(#${shine})`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "20",
				fill: "none",
				stroke: "#fff",
				strokeOpacity: "0.35",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 22.2 44.4 32 28 41.8Z",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M48.2 13.4 49.6 17l3.8.4-2.9 2.4.9 3.6-3.4-2-3.4 2 .9-3.6-2.9-2.4 3.8-.4Z",
				fill: "#fff"
			})
		]
	});
}
var COLORS = [
	"91,46,234",
	"255,77,58",
	"180,120,20",
	"12,138,102"
];
function ParticleField() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let width = window.innerWidth;
		let height = window.innerHeight;
		let specks = [];
		let raf = 0;
		let alive = true;
		let last = 0;
		const seed = () => {
			const count = Math.max(24, Math.min(48, Math.floor(width * height / 42e3)));
			specks = Array.from({ length: count }, (_, index) => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - .5) * .28,
				vy: (Math.random() - .5) * .28,
				r: .7 + Math.random() * 1.2,
				color: COLORS[index % COLORS.length]
			}));
		};
		const resize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
			seed();
		};
		const draw = (now) => {
			if (!alive) return;
			raf = window.requestAnimationFrame(draw);
			if (document.hidden || now - last < 32) return;
			last = now;
			ctx.clearRect(0, 0, width, height);
			for (const speck of specks) {
				speck.x += speck.vx;
				speck.y += speck.vy;
				if (speck.x < -8) speck.x = width + 8;
				else if (speck.x > width + 8) speck.x = -8;
				if (speck.y < -8) speck.y = height + 8;
				else if (speck.y > height + 8) speck.y = -8;
				ctx.fillStyle = `rgba(${speck.color},0.45)`;
				ctx.fillRect(speck.x, speck.y, speck.r, speck.r);
			}
		};
		resize();
		window.addEventListener("resize", resize);
		raf = window.requestAnimationFrame(draw);
		return () => {
			alive = false;
			window.cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "particle-field",
		"aria-hidden": "true"
	});
}
var LINKS = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/youtube",
		label: "YouTube"
	},
	{
		to: "/blog",
		label: "Blog"
	}
];
var TOOLS = [
	{
		to: "/youtube",
		label: "Subscriber count"
	},
	{
		to: "/monetization",
		label: "Monetization check"
	},
	{
		to: "/thumbnails",
		label: "Thumbnails"
	},
	{
		to: "/transcript",
		label: "Transcript"
	}
];
function Shell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "aurora",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb orb-a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb orb-b" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb orb-c" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-3 z-30 px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nav-float mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full border border-white/80 px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 pl-2 font-display text-lg font-bold tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "logo-spin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-10" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text",
								children: "TubeNova"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-1 md:flex",
							"aria-label": "Primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									activeOptions: { exact: true },
									className: "rounded-full px-3 py-2 text-sm text-muted hover:bg-white hover:text-fg",
									activeProps: { className: "rounded-full bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm" },
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/tools",
										className: "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-muted hover:bg-white hover:text-fg",
										activeProps: { className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm" },
										children: ["Tools", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "invisible absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-2xl border border-white bg-white p-2 shadow-lg",
											children: TOOLS.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: tool.to,
												className: "block rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-fg",
												activeProps: { className: "block rounded-xl bg-surface-2 px-3 py-2 text-sm font-semibold text-primary" },
												children: tool.label
											}, tool.to))
										})
									})]
								}),
								LINKS.filter((link) => link.to !== "/").map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: link.to,
									className: "rounded-full px-3 py-2 text-sm text-muted hover:bg-white hover:text-fg",
									activeProps: { className: "rounded-full bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm" },
									children: link.label
								}, link.to))
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/youtube",
							className: "btn-glow hidden h-11 items-center rounded-full px-5 text-sm font-semibold text-white md:inline-flex",
							children: "Check a channel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-full border border-line bg-white md:hidden",
							"aria-label": open ? "Close menu" : "Open menu",
							"aria-expanded": open,
							onClick: () => setOpen((value) => !value),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden",
					"aria-label": "Mobile",
					children: [
						LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: "rounded-xl px-3 py-3 text-base text-muted",
							activeProps: { className: "rounded-xl bg-white px-3 py-3 text-base font-semibold text-primary" },
							onClick: () => setOpen(false),
							children: link.label
						}, link.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 pt-2 text-xs font-semibold tracking-[0.16em] text-primary uppercase",
							children: "Tools"
						}),
						TOOLS.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: tool.to,
							className: "rounded-xl px-3 py-3 text-base text-muted",
							activeProps: { className: "rounded-xl bg-white px-3 py-3 text-base font-semibold text-primary" },
							onClick: () => setOpen(false),
							children: tool.label
						}, tool.to))
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "page-enter",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "footer-band mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: "TubeNova"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xs text-sm text-muted",
							children: "YouTube stats, monetization, thumbnails, and transcripts. Not affiliated with YouTube or Google."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-fg",
									children: "Tools"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/youtube",
									className: "hover:text-primary",
									children: "YouTube subscriber count"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/monetization",
									className: "hover:text-primary",
									children: "Monetization check"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/thumbnails",
									className: "hover:text-primary",
									children: "Thumbnails"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/transcript",
									className: "hover:text-primary",
									children: "Transcript"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-fg",
									children: "Learn"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blog",
									className: "hover:text-primary",
									children: "Blog"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "hover:text-primary",
									children: "About"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/studio",
									className: "hover:text-primary",
									children: "Studio"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-fg",
									children: "Legal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "hover:text-primary",
									children: "Privacy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/terms",
									className: "hover:text-primary",
									children: "Terms"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 pb-8 text-center text-xs text-muted",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" TubeNova"
					]
				})]
			})
		]
	});
}
//#endregion
export { Shell as t };
