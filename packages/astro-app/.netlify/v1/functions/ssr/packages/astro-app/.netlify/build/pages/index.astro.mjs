/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, b as createAstro, d as addAttribute, e as renderHead, f as renderSlot } from '../chunks/astro/server_C7YmdsYf.mjs';
import $$Card from '../chunks/Card_CuQX6OWZ.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_DIOi0CDY.mjs';
export { renderers } from '../renderers.mjs';

const $$CardSkeleton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div role="status" class="max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow animate-pulse"> <div class="bg-white flex justify-center content-center h-37"> <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"> <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path> </svg> </div> <div class="p-5"> <div class="h-2xl mb-2 bg-gray-900 dark:bg-white rounded-full"></div> <div class="h-2 bg-gray-900 dark:bg-neutral-300"></div> <div class="h-2 bg-gray-900 dark:bg-neutral-300"></div> </div> <span class="sr-only">Loading...</span> </div>`;
}, "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/components/CardSkeleton.astro", undefined);

const $$App = createComponent(async ($$result, $$props, $$slots) => {
  const randomInt = Math.floor(Math.random() * 1e3);
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${randomInt}`
  ).then((res) => res.json()).then((res) => res.results);
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-2xl p-4 lg:max-w-7xl lg:p-8"> <h2 class="mb-2">Pokemon</h2> <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> ${pokemon.map((p) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "pokemonUrl": p.url, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/components/Card.astro", "server:component-export": "default" }, { "fallback": ($$result2) => renderTemplate`${renderComponent($$result2, "CardSkeleton", $$CardSkeleton, { "slot": "fallback" })}` })}`)} </div> </section>`;
}, "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/components/App.astro", undefined);

const logo = new Proxy({"src":"/_astro/astro.Dm8K3lV8.svg","width":115,"height":48,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/assets/astro.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="bg-teal-300 p-2 w-full"> <span> <span class="sr-only">Astro App</span> ${renderComponent($$result, "Image", $$Image, { "alt": "Astro logo", "src": logo })} </span> <h1>Static Header</h1> </header>`;
}, "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/components/Header.astro", undefined);

const background = new Proxy({"src":"/_astro/background.BPKAcmfN.svg","width":1440,"height":1024,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/assets/background.svg";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro App</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> <img id="background"${addAttribute(background.src, "src")} alt="" fetchpriority="high" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["header"])} <main data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/layouts/Layout.astro", undefined);

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "App", $$App, {})} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header" })}` })}`;
}, "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/pages/index.astro", undefined);

const $$file = "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
