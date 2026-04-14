/* empty css                                   */
import { c as createComponent, a as renderComponent, r as renderTemplate } from '../../chunks/astro/server_SFlxVYzk.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_D7_TKk5i.mjs';
export { renderers } from '../../renderers.mjs';

const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Doctor Profile - findr.it" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SearchApp", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/components/searchApp/SearchApp.jsx", "client:component-export": "SearchApp" })} ` })}`;
}, "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/doctor/[...id].astro", void 0);

const $$file = "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/doctor/[...id].astro";
const $$url = "/doctor/[...id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
