import App from "@/components/app";
import { Header } from "shared-ui";
import logo from "@/public/vercel.svg";
import Image from "next/image";

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
