/* empty css                                */
import { b as createAstro, c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_SFlxVYzk.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_B3lr_rLA.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://findr.cl");
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { id } = Astro2.params;
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  if (isUUID) {
    return Astro2.redirect(`/doctor/${id}`);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "findr.it" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Page not found</h1> ` })}`;
}, "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/[...id].astro", void 0);

const $$file = "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/[...id].astro";
const $$url = "/[...id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
