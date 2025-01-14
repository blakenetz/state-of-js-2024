import App from "@/components/app";
import logo from "@/public/vercel.svg";
import Image from "next/image";
import { Header } from "shared-ui";

export default function Home() {
  return (
    <main>
      <Header
        image={<Image alt="Vercel logo" src={logo} height={30} />}
        title="Next.js App"
      />
      <App />
    </main>
  );
}
