import chalk from "chalk";
import { value } from "./data/liveBindings";

const logger = {
  log(description: string, ...args: any[]) {
    console.log(chalk.green(description), ...args);
  },
  error(description: string, ...args: any[]) {
    console.error(chalk.red(description), ...args);
  },
};
// import http from "node:http";

// const port = 3000;
// const host = "localhost";

// const server = http.createServer((req, res) => {
//   // Log each request
//   console.log(`${req.method} ${req.url}`);
// });

// server.listen(port, host, () => {
//   console.log(`Server running at http://${host}:${port}/`);
// });

async function main() {
  logger.log("Initial value", value);
  setTimeout(() => logger.log("After 1000ms", value), 1000);
}

main().catch((e) => console.error("Error in main.ts", e));
