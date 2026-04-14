import type { APIRoute } from "astro";
import { supabase } from "@/components/api/supabase/supabase";

const SITE = "https://www.findr.cl";

const staticUrls = [
    { loc: SITE, priority: "1.0", changefreq: "weekly" },
    { loc: `${SITE}/search`, priority: "0.8", changefreq: "daily" },
];

export const GET: APIRoute = async () => {
    const { data: doctors } = await supabase
        .from("doctor_search_view_flat")
        .select("id")
        .limit(5000);

    const doctorUrls = (doctors ?? []).map((d) => ({
        loc: `${SITE}/doctor/${d.id}`,
        priority: "0.7",
        changefreq: "monthly",
    }));

    const allUrls = [...staticUrls, ...doctorUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(
        (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
};
