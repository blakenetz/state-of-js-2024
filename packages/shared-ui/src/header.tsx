import React from "react";

interface HeaderProps {
  image: React.ReactNode;
  title: string;
}

export default function Header({ image, title }: HeaderProps) {
  return (
    <header className="bg-teal-300 p-2 w-full">
      <span>
        <span className="sr-only">{title}</span>
        {image}
      </span>
      <h1>Static Header</h1>
    </header>
  );
}
