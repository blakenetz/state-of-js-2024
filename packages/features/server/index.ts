import http from "node:http";
import fs from "node:fs";
import handleWebSocket from "./webSocket";

export const port = 3000;
export const host = "localhost";

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const readOptions: { encoding: BufferEncoding } = { encoding: "utf-8" };
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs.readFileSync("client/index.html", readOptions);
      res.end(html);
      break;

    case "/module":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      const js = fs.readFileSync("data/liveBindings.ts", readOptions);
      res.end(js);
      break;

    case "/data":
      res.writeHead(200, { "Content-Type": "application/json" });
      const json = fs.readFileSync("data/data.json", readOptions);
      res.end(json);
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end('Only GET methods on "/" endpoint is available!');
      break;
  }
});

// Handle upgrade requests
server.on("upgrade", handleWebSocket);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
