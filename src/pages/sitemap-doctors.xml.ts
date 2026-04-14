import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const GET: APIRoute = async () => {
    const supabase = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: doctors } = await supabase
        .from('doctor_search_view_flat')
        .select('id, updated_at')
        .order('id');

    if (!doctors) {
        return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
            headers: { 'Content-Type': 'application/xml' },
        });
    }

    const urls = doctors.map((doc) => {
        const lastmod = doc.updated_at
            ? new Date(doc.updated_at).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0];
        return `
  <url>
    <loc>https://findr.cl/doctor/${doc.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400', // cache 24h
        },
    });
};
