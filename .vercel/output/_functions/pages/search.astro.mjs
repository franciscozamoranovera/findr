/* empty css                                */
import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_SFlxVYzk.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_D7_TKk5i.mjs';
export { renderers } from '../renderers.mjs';

const $$Search = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Buscar m\xE9dicos en Chile | findr", "description": "Encuentra m\xE9dicos por especialidad, nombre o enfermedad. Filtra por regi\xF3n, ciudad y previsi\xF3n. Compara ratings y lee rese\xF1as reales." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-dvh"> ${renderComponent($$result2, "SearchApp", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/components/searchApp/SearchApp.jsx", "client:component-export": "SearchApp" })} </div>   ` })}`;
}, "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/search.astro", void 0);

const $$file = "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Search,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
