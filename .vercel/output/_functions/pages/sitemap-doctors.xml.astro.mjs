import { createClient } from '@supabase/supabase-js';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const supabase = createClient(
    "https://ehdwumyvvxjmzatwkrhu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZHd1bXl2dnhqbXphdHdrcmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDkwNDQsImV4cCI6MjA1OTI4NTA0NH0.KB45j2HWqH9Ub63OFPXKi81FNU1qY6fq5wI8jWFBkiU"
  );
  const { data: doctors } = await supabase.from("doctor_search_view_flat").select("id, updated_at").order("id");
  if (!doctors) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { "Content-Type": "application/xml" }
    });
  }
  const urls = doctors.map((doc) => {
    const lastmod = doc.updated_at ? new Date(doc.updated_at).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    return `
  <url>
    <loc>https://findr.cl/doctor/${doc.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400"
      // cache 24h
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
