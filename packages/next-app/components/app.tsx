interface Pokemon {
  name: string;
  url: string;
}

import { Suspense } from "react";
import { Grid, CardSkeleton } from "shared-ui";
import Card from "./card";

export default async function App() {
  const randomInt = Math.floor(Math.random() * 1000);
  const pokemon: Pokemon[] = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${randomInt}`
  )
    .then((res) => res.json())
    .then((res) => res.results);

  return (
    <Grid>
      {pokemon.map((p) => (
        <Suspense fallback={<CardSkeleton />} key={p.name}>
          <Card pokemonUrl={p.url} />
        </Suspense>
      ))}
    </Grid>
  );
}
