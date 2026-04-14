import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_iGBOFibP.mjs';
import { manifest } from './manifest_Diob1W-P.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/upload.astro.mjs');
const _page2 = () => import('./pages/api/uploadavatar.astro.mjs');
const _page3 = () => import('./pages/buscar/_especialidad_/_ciudad_.astro.mjs');
const _page4 = () => import('./pages/doctor/_---id_.astro.mjs');
const _page5 = () => import('./pages/footer.astro.mjs');
const _page6 = () => import('./pages/login.astro.mjs');
const _page7 = () => import('./pages/profiledoc.astro.mjs');
const _page8 = () => import('./pages/review.astro.mjs');
const _page9 = () => import('./pages/search.astro.mjs');
const _page10 = () => import('./pages/sitemap-doctors.xml.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const _page12 = () => import('./pages/_---id_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/upload.js", _page1],
    ["src/pages/api/uploadAvatar.js", _page2],
    ["src/pages/buscar/[especialidad]/[ciudad].astro", _page3],
    ["src/pages/doctor/[...id].astro", _page4],
    ["src/pages/footer.astro", _page5],
    ["src/pages/login.astro", _page6],
    ["src/pages/profileDoc.astro", _page7],
    ["src/pages/review.astro", _page8],
    ["src/pages/search.astro", _page9],
    ["src/pages/sitemap-doctors.xml.ts", _page10],
    ["src/pages/index.astro", _page11],
    ["src/pages/[...id].astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "68afd46a-c9ff-41e8-8a52-9ce24bcf70d4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
