import { value as staticValue } from "./data/liveBindings";
import chalk from "chalk";

function log(...args: any[]) {
  const [title, description, ...rest] = args;
  console.log(chalk.magenta(title), chalk.cyan(description), ...rest);
}

async function dynamicImports() {
  const time = 1500;
  const { value: dynamicValue } = await import("./data/liveBindings");

  log("[STATIC]", "initial value", staticValue);
  log("[DYNAMIC]", "initial value", dynamicValue);

  setTimeout(() => {
    log("[STATIC]", "after ${time}ms", staticValue);
    log("[DYNAMIC]", "after ${time}ms", dynamicValue);
  }, time);
}

async function allSettled() {
  const promises = [Promise.resolve("Good!"), Promise.reject("Bad!")];
  const all = await Promise.all(promises).catch(
    (e) => `REJECTED WITH ERROR: ${e}`
  );
  const settled = await Promise.allSettled(promises).catch((e) => e);
  log("[ALL]", "results", all);
  log("[ALL_SETTLED]", "results", settled);
}

async function main() {
  await dynamicImports();
  await allSettled();
}

main().catch((e) => console.error("Error in main.ts", e));
