import http from "node:http";
import fs from "node:fs";

const port = 3000;
const host = "localhost";
const options: { encoding: BufferEncoding } = { encoding: "utf-8" };

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs.readFileSync("client/index.html", options);
      res.end(html);
      break;

    case "/module":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      const js = fs.readFileSync("data/liveBindings.ts", options);
      res.end(js);
      break;

    case "/data":
      res.writeHead(200, { "Content-Type": "application/json" });
      const json = fs.readFileSync("data/data.json", options);
      res.end(json);
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end('Only GET methods on "/" endpoint is available!');
      break;
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
