import { i as __toESM } from "../_runtime.mjs";
import { t as POSTS } from "./posts-Dl83ry_H.mjs";
import { Y as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as lookupProfile } from "./lookup-JUmujsoI.mjs";
import { a as LoaderCircle, c as ArrowRight, o as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as Shell } from "./shell-CraOwRKs.mjs";
import { n as formatCount, t as LiveCount } from "./live-count-BY6VPgbZ.mjs";
import { n as ProfileCard } from "./lookup-panel-DCA_4EJX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-bbaW_cQL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchForm({ onProfile }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [hint, setHint] = (0, import_react.useState)("");
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const cardRef = (0, import_react.useRef)(null);
	async function go(raw) {
		const value = raw.trim();
		if (!value) {
			setHint("Paste a YouTube channel link.");
			setProfile(null);
			onProfile?.(null);
			return;
		}
		setQuery(value);
		setHint("");
		setError("");
		setLoading(true);
		try {
			const result = await lookupProfile({ data: {
				platform: "youtube",
				q: value
			} });
			setProfile(result);
			onProfile?.(result);
			requestAnimationFrame(() => {
				cardRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "nearest"
				});
			});
		} catch (cause) {
			setProfile(null);
			onProfile?.(null);
			setError(cause instanceof Error ? cause.message : "Lookup failed. Try again.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "mt-8",
			onSubmit: (event) => {
				event.preventDefault();
				go(query);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dock",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dock-inner flex flex-col gap-3 p-2 sm:flex-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "home-q",
							children: "YouTube channel URL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "home-q",
							suppressHydrationWarning: true,
							value: query,
							enterKeyHint: "search",
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Paste a YouTube channel link",
							className: "h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white",
							children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Check stats"]
						})
					]
				})
			})
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-coral",
			children: hint
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-coral",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs text-muted",
			children: "Press Enter or click Check stats. The card opens here."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: cardRef,
			children: [loading && !profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-open mt-4 flex items-center gap-3 rounded-[28px] border border-white bg-white px-5 py-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: "Checking live stats…"
				})]
			}) : null, profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
				profile,
				platform: "youtube"
			}) : null]
		})
	] });
}
function Home() {
	const ribbon = [
		"Live subscribers",
		"Public photo",
		"View count",
		"Video count",
		"Press Enter"
	];
	const [profile, setProfile] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero-sky",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-art",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ribbon ribbon-a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ribbon ribbon-b" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ribbon ribbon-c" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 pt-8 pb-12 lg:grid-cols-12 lg:pt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "inline-flex items-center rounded-full border border-white bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-primary uppercase shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "live-dot",
								children: "YouTube, live"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 max-w-xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "word",
									style: { animationDelay: "40ms" },
									children: "Watch"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "word",
									style: { animationDelay: "120ms" },
									children: "the"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "word",
									style: { animationDelay: "200ms" },
									children: "count"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "word gradient-text",
									style: { animationDelay: "280ms" },
									children: "arrive."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "word mt-5 max-w-lg text-lg leading-8 text-muted",
							style: { animationDelay: "360ms" },
							children: "Paste a channel URL or @handle. The stage on the right and the card below both switch to that channel."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, { onProfile: setProfile })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, { profile })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-wrap",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "marquee-track",
				children: [...ribbon, ...ribbon].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item }, `${item}-${index}`))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl tracking-tight",
				children: "More YouTube tools"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/monetization",
						className: "lift-card rounded-[28px] border border-white bg-white/80 p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl",
							children: "Monetization"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted",
							children: "Check the public subscriber bar a channel must clear before ads can be turned on."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/thumbnails",
						className: "lift-card rounded-[28px] border border-white bg-white/80 p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl",
							children: "Thumbnails"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted",
							children: "Download a video thumbnail or a channel profile photo."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/transcript",
						className: "lift-card rounded-[28px] border border-white bg-white/80 p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl",
							children: "Transcript"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted",
							children: "Paste a video link and read the words from its caption track."
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl tracking-tight",
					children: "Guides beside the tool"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog",
					className: "hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex",
					children: ["All posts ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: POSTS.slice(0, 3).map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: post.slug },
					className: "lift-card flex min-h-52 flex-col rounded-[28px] border border-white bg-white/80 p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold tracking-[0.16em] text-primary uppercase",
							children: [
								"0",
								index + 1,
								" · ",
								post.minutes,
								" min"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-3xl leading-tight tracking-tight",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-sm leading-6 text-muted",
							children: post.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-4 text-sm font-semibold text-primary",
							children: "Read"
						})
					]
				}, post.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faqs, {})
	] });
}
function Stage({ profile }) {
	const [photoOk, setPhotoOk] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setPhotoOk(true);
	}, [profile?.avatar]);
	const initial = (profile?.title || "?").slice(0, 1).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "stage profile-open relative min-h-[22rem] p-7 lg:col-span-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "halo",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center gap-4",
				children: [profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative size-16 shrink-0",
					children: photoOk && profile.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.avatar,
						alt: "",
						referrerPolicy: "no-referrer",
						onError: () => setPhotoOk(false),
						className: "size-16 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-16 place-items-center rounded-full bg-primary font-display text-xl text-white",
						children: initial
					})
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.22em] text-muted uppercase",
						children: profile ? profile.handle : "Your channel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate font-display text-3xl",
						children: profile ? profile.title : "Waiting for a link"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative mt-6 font-display text-6xl tracking-tight sm:text-7xl",
				children: profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCount, { value: profile.subscribers }) : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative mt-1 text-sm text-muted",
				children: "Subscribers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "relative mt-8 grid grid-cols-2 gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-white bg-white/70 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Views"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-semibold",
						children: profile ? compact(profile.views) : "—"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-white bg-white/70 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Videos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-semibold",
						children: profile ? formatCount(profile.videos) : "—"
					})]
				})]
			})
		]
	}, profile?.id ?? "empty");
}
var FAQS = [
	{
		q: "How do I check a YouTube subscriber count?",
		a: "Paste a channel URL or @handle and press Enter. The stage and the card show the photo, subscribers, views, and videos."
	},
	{
		q: "Is the subscriber count exact?",
		a: "Above 1,000 subscribers, YouTube rounds the public number to three significant figures. Channel owners see the exact count in YouTube Studio."
	},
	{
		q: "Can I tell if a channel is monetized?",
		a: "Open Monetization check and paste the channel. Under 1,000 subscribers it shows Not monetized. Past that bar it shows Monetized."
	},
	{
		q: "Can I download a thumbnail or profile photo?",
		a: "Yes. Open Thumbnails, paste a video link for that thumbnail, or a channel link for the profile photo and recent video thumbnails."
	},
	{
		q: "How does the transcript work?",
		a: "Paste a video link. TubeNova reads the caption track YouTube made from the audio, and uses the creator’s own captions when they exist."
	}
];
function compact(value) {
	if (!value) return "—";
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
}
function Faqs() {
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-4xl tracking-tight",
			children: "Frequently asked questions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 divide-y divide-line overflow-hidden rounded-[28px] border border-white bg-white/90",
			children: FAQS.map((item, index) => {
				const shown = open === index;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
					"aria-expanded": shown,
					onClick: () => setOpen(shown ? null : index),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base font-semibold",
						children: item.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface-2 text-muted transition ${shown ? "rotate-180" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
					})]
				}), shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 pb-5 text-sm leading-7 text-muted",
					children: item.a
				}) : null] }, item.q);
			})
		})]
	});
}
//#endregion
export { Home as component };
