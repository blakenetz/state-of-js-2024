import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, b as createAstro } from './astro/server_C7YmdsYf.mjs';

const $$Astro = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { pokemonUrl } = Astro2.props;
  const data = await fetch(pokemonUrl).then((res) => res.json()).then((data2) => new Promise((r) => setTimeout(() => r(data2), 3e3)));
  return renderTemplate`${maybeRenderHead()}<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> <div class="bg-white flex justify-center p-1"> <img${addAttribute(data.sprites.front_default, "src")}${addAttribute(`${data.name}'s front view'`, "alt")}> </div> <div class="p-5"> <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> ${data.name} </h5> <ul class="tracking-tight text-gray-900 dark:text-neutral-300"> <li>${`Height: ${data.height}`}</li> <li>${`Weight: ${data.weight}`}</li> </ul> </div> </div>`;
}, "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/components/Card.astro", undefined);

const $$file = "/Users/blakenetzeband/workspace/state-of-js-2024/packages/astro-app/src/components/Card.astro";
const $$url = undefined;

export { $$Card as default, $$file as file, $$url as url };
