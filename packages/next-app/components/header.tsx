import Image from "next/image";
import logo from "@/public/vercel.svg";

export default function Header() {
  return (
    <header className="bg-teal-300 p-2 w-full">
      <span>
        <span className="sr-only">Astro App</span>
        <Image alt="Astro logo" src={logo} height={30} />
      </span>
      <h1>Static Header</h1>
    </header>
  );
}
