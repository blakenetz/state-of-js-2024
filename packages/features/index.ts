import { value } from "./data/liveBindings";

async function main() {
  console.log("Initial value", value);
  setTimeout(() => console.log("After 1000ms", value), 1000);
}

main().catch((e) => console.error("Error in main.ts", e));
