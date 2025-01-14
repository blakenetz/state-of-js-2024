import Image from "next/image";
import { Card as SharedUiCard } from "shared-ui";

interface Props {
  pokemonUrl: string;
}

interface Data {
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;
}

export default async function Card({ pokemonUrl }: Props) {
  const data: Data = await fetch(pokemonUrl)
    .then((res) => res.json())
    .then((data) => new Promise((r) => setTimeout(() => r(data), 3000)));

  return (
    <SharedUiCard
      image={
        <Image
          src={data.sprites.front_default}
          alt={`${data.name}'s front view'`}
        />
      }
      name={data.name}
      height={data.height}
      weight={data.weight}
    />
  );
}
