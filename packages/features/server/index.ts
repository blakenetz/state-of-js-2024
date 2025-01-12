import http from "node:http";
import fs from "node:fs";
import handleWebSocket from "./webSocket";
import { host, port } from "./util";

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const readOptions: { encoding: BufferEncoding } = { encoding: "utf-8" };
  switch (req.url) {
    case "/":
      try {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync("client/index.html", readOptions);
        res.end(html);
      } catch (error) {}
      break;

    case "/module":
      try {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        const js = fs.readFileSync("data/liveBindings.ts", readOptions);
        res.end(js);
      } catch (error) {}
      break;

    case "/data":
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        const json = fs.readFileSync("data/data.json", readOptions);
        res.end(json);
      } catch (error) {}
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("NOT FOUND");
      break;
  }
});

// Handle upgrade requests
server.on("upgrade", handleWebSocket);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
