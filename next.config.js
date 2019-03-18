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
          templatedUrls: {
            '/' : '/index.html',
            '/index' : '/index/index.html',
            '/index/' : '/index/index.html',
            '/capture' : '/capture/index.html',
            '/capture/' : '/capture/index.html',
            '/animation' : '/animation/index.html',
            '/animation/' : '/animation/index.html'
          },
          runtimeCaching: [
            {
              urlPattern: /_next\/static/,
              handler: "networkFirst"
            },
            {
              urlPattern: /static/,
              handler: "networkFirst"
            },
            {
              urlPattern: /.html/,
              handler: "networkFirst"
            }
          ]
        }
      })
    )
  )
);
