import chalk from "chalk";

function log(...args: any[]) {
  const [description, ...rest] = args;
  console.log(chalk.green(description), ...rest);
}

async function main() {}

main();
