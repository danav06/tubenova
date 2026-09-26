import { PUBLIC_PATHS } from "../../src/lib/seo";

interface SeoEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

function originOf(event: SeoEvent): string {
  const host = event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host;
  const proto = event.req.headers.get("x-forwarded-proto") ?? (event.url.protocol.replace(":", "") || "https");
  return `${proto}://${host.split(",")[0].trim()}`;
}

export default async function seoFiles(event: SeoEvent, next: () => Promise<unknown>) {
  const path = event.url.pathname;
  const origin = originOf(event);

  if (path === "/google0021d7e22885d43f.html") {
    return new Response("google-site-verification: google0021d7e22885d43f.html", {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  if (path === "/robots.txt") {
    return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, {
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
    });
  }

  if (path === "/sitemap.xml") {
    const urls = PUBLIC_PATHS.map(
      (page) =>
        `<url><loc>${origin}${page}</loc><changefreq>${page === "/" ? "daily" : "weekly"}</changefreq></url>`,
    ).join("");
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
      { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } },
    );
  }

  const result = await next();
  if (!(result instanceof Response) || !result.body) return result;
  const type = result.headers.get("content-type") ?? "";
  if (!type.includes("text/html") || result.headers.get("content-encoding")) return result;
  const html = await result.text();
  if (!html.includes("</head>") || html.includes('rel="canonical"')) {
    return new Response(html, { status: result.status, headers: result.headers });
  }
  const canonical = `${origin}${path === "/" ? "/" : path}`;
  const headers = new Headers(result.headers);
  headers.delete("content-length");
  return new Response(html.replace("</head>", `<link rel="canonical" href="${canonical}"></head>`), {
    status: result.status,
    headers,
  });
}
