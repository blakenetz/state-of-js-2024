import Image from "next/image";

interface Props {
  pokemonUrl: string;
}

interface Data {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

export default async function Card({ pokemonUrl }: Props) {
  const data: Data = await fetch(pokemonUrl)
    .then((res) => res.json())
    .then((data) => new Promise((r) => setTimeout(() => r(data), 3000)));

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-white flex justify-center p-1">
        <Image
          src={data.sprites.front_default}
          alt={`${data.name}'s front view'`}
        />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.name}
        </h5>

        <ul className="tracking-tight text-gray-900 dark:text-neutral-300">
          <li>{`Height: ${data.height}`}</li>
          <li>{`Weight: ${data.weight}`}</li>
        </ul>
      </div>
    </div>
  );
}
