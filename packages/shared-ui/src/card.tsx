import React from "react";

interface CardProps {
  image: React.ReactNode;
  name: string;
  height: string;
  weight: string;
}

export default function Card({ image, name, height, weight }: CardProps) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-white flex justify-center p-1">{image}</div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>

        <ul className="tracking-tight text-gray-900 dark:text-neutral-300">
          <li>{`Height: ${height}`}</li>
          <li>{`Weight: ${weight}`}</li>
        </ul>
      </div>
    </div>
  );
}
