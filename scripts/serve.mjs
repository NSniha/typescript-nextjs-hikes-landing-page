import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

if (!existsSync(resolve(root, "index.html"))) {
  console.error("No exported build found. Run npm run build first.");
  process.exit(1);
}

createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url || "/", "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = resolve(file, "index.html");
  if (!existsSync(file) || !statSync(file).isFile()) {
    response.statusCode = 404;
    file = resolve(root, "404.html");
  }
  response.setHeader(
    "Content-Type",
    types[extname(file)] || "application/octet-stream",
  );
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  const stream = createReadStream(file);
  stream.on("error", () => response.destroy());
  stream.pipe(response);
}).listen(port, "0.0.0.0", () =>
  console.log(`SYNTASK is ready at http://localhost:${port}`),
);
