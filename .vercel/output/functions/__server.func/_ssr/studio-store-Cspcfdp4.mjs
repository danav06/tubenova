//#region node_modules/.nitro/vite/services/ssr/assets/studio-store-Cspcfdp4.js
var KEY = "orbitcount.posts";
function readExtraPosts() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((post) => post && typeof post.slug === "string" && typeof post.title === "string");
	} catch {
		return [];
	}
}
function writeExtraPosts(posts) {
	window.localStorage.setItem(KEY, JSON.stringify(posts));
}
//#endregion
export { writeExtraPosts as n, readExtraPosts as t };
