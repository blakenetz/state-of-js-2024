import http from "node:http";
import fs from "node:fs";

const port = 3000;
const host = "localhost";

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs.readFileSync("client/index.html", { encoding: "utf-8" });
      res.end(html);
      break;

    case "/module":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      const js = fs.readFileSync("data/liveBindings.ts", { encoding: "utf-8" });
      res.end(js);
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
