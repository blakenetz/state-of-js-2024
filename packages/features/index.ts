import { value as staticValue } from "./data/liveBindings";

const time = 1500;

async function main() {
  const { value: dynamicValue } = await import("./data/liveBindings");

  console.log("[STATIC] initial value", staticValue);
  console.log("[DYNAMIC] initial value", dynamicValue);

  setTimeout(() => {
    console.log(`[STATIC] after ${time}ms`, staticValue);
    console.log(`[DYNAMIC] after ${time}ms`, dynamicValue);
  }, time);
}

main().catch((e) => console.error("Error in main.ts", e));
