const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const { join } = require("path");
const copyfiles = require("copyfiles");
const withOffline = require("next-offline");

const PRECACHE_DIR = "precache";

module.exports = withOffline(
  withSass(
    withCSS(
      withFonts({
        generateInDevMode: true,
        workboxOpts: {
          runtimeCaching: [
            {
              urlPattern: /_next\/static/,
              handler: "cacheFirst"
            },
            {
              urlPattern: /static/,
              handler: "cacheFirst"
            }
          ]
        }
      })
    )
  )
);
