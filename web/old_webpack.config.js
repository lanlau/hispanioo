//import sveltePreprocess from 'svelte-preprocess';

const sveltePreprocess = require("svelte-preprocess");
//import preprocess from 'svelte/types/compiler/preprocess';
const webpack = require("webpack");
const config = require("sapper/config/webpack.js");
const pkg = require("./package.json");
const buble = require("rollup-plugin-buble");
const mode = process.env.NODE_ENV;
const dev = mode === "development";

const extensions = [".mjs", ".js", ".json", ".svelte", ".html"];
const mainFields = ["svelte", "module", "browser", "main"];
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              dev,
              hydratable: true,
              hotReload: true, // pending https://github.com/sveltejs/svelte/issues/2377,
              preprocess: sveltePreprocess({ postcss: true })
            }
          }
        }
      ]
    },
    mode,
    plugins: [
      buble(),

      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      })
    ].filter(Boolean),
    devtool: dev && "inline-source-map"
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: "node",
    resolve: { extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat("encoding"),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              css: false,
              generate: "ssr",
              dev,
              preprocess: sveltePreprocess({ postcss: true })
            }
          }
        }
      ]
    },
    mode: process.env.NODE_ENV,
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
};
