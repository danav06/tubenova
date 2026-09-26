//#region node_modules/.nitro/vite/services/ssr/assets/posts-Dl83ry_H.js
var POSTS = [{
	slug: "youtube-subscriber-count",
	title: "How to check a YouTube subscriber count",
	description: "Channel page, Studio, the Data API, and why the public number is rounded.",
	date: "2026-09-26",
	category: "YouTube",
	minutes: 6,
	blocks: [
		{
			kind: "p",
			text: "A YouTube subscriber count comes from four honest places: the public channel page, YouTube Studio if you own the channel, the YouTube Data API, or a checker like TubeNova that calls that API."
		},
		{
			kind: "h2",
			text: "On the channel page"
		},
		{
			kind: "p",
			text: "Open the channel. Under the name, YouTube prints a public subscriber figure. Above 1,000 subscribers that figure is rounded to three significant figures. 123,456 shows as 123,000. That is platform policy, not a broken tracker."
		},
		{
			kind: "h2",
			text: "In Studio"
		},
		{
			kind: "p",
			text: "Exact unrounded counts live in YouTube Studio and are visible only to the channel owner. Public APIs do not return that private number."
		},
		{
			kind: "h2",
			text: "Through the Data API"
		},
		{
			kind: "p",
			text: "channels.list with part=snippet,statistics returns subscriberCount, viewCount, and videoCount. You can look up a channel by id, @handle, or legacy username."
		},
		{
			kind: "h2",
			text: "In TubeNova"
		},
		{
			kind: "p",
			text: "Paste a youtube.com URL, @handle, or UC id on the YouTube page. When a YouTube Data API key is configured on the server, the dashboard uses official figures. Without a key, TubeNova shows a stable preview snapshot and says so."
		}
	]
}, {
	slug: "youtube-rounded-subscribers",
	title: "Why YouTube subscriber counts look stuck",
	description: "Three significant figures, hidden counts, and what still moves.",
	date: "2026-09-26",
	category: "YouTube",
	minutes: 5,
	blocks: [
		{
			kind: "p",
			text: "A channel can gain thousands of people and the public counter will not blink. That is rounding."
		},
		{
			kind: "h2",
			text: "Three significant figures"
		},
		{
			kind: "p",
			text: "Once a channel passes 1,000 subscribers, the public subscriberCount is rounded to three significant figures. It stays on that plateau until the true count crosses the next display bucket."
		},
		{
			kind: "h2",
			text: "Hidden counts"
		},
		{
			kind: "p",
			text: "Owners can hide the public subscriber number. The API then sets hiddenSubscriberCount to true. TubeNova flags that instead of inventing a figure."
		},
		{
			kind: "h2",
			text: "What still updates"
		},
		{
			kind: "p",
			text: "View counts and public video counts are not rounded the same way. They are the better signal that a feed is fresh while subscribers sit still."
		}
	]
}];
function findPost(slug) {
	return POSTS.find((post) => post.slug === slug);
}
//#endregion
export { findPost as n, POSTS as t };
