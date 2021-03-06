const https = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const { join } = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync("private/key.pem"),
  cert: fs.readFileSync("private/cert.pem")
};

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // handle GET request to /service-worker.js
      if (pathname === "/service-worker.js" || pathname.match(/precache/)) {
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      } else {
        handle(req, res, parsedUrl);
      }
    })
    .listen(3000, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log("> Ready on https://localhost:3000");
    });
});
