interface Pokemon {
  name: string;
  url: string;
}

import { Suspense } from "react";
import Card from "./card";
import CardSkeleton from "./cardSkeleton";

export default async function App() {
  const randomInt = Math.floor(Math.random() * 1000);
  const pokemon: Pokemon[] = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${randomInt}`
  )
    .then((res) => res.json())
    .then((res) => res.results);

  return (
    <section className="mx-auto max-w-2xl p-4 lg:max-w-7xl lg:p-8">
      <h2 className="mb-2">Pokemon</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {pokemon.map((p) => (
          <Suspense fallback={<CardSkeleton />} key={p.name}>
            <Card pokemonUrl={p.url} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}
