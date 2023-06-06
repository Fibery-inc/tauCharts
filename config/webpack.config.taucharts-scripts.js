const plugins = require("./scripts-plugins");
const { resolvePath, resolve } = require("./resolve");
const externals = require("./externals");
const webpackModule = require("./scripts-module");
const path = require("path");
module.exports = {
  devServer: {
    static: [
      {
        directory: path.resolve("./examples/"),
        publicPath: [`/examples/`],
        serveIndex: true,
      },
      {
        directory: path.resolve("./"),
        publicPath: [`/`],
      },
    ],
    open: ["examples/"],
  },
  output: {
    publicPath: "/dist/",
    filename: "[name].js",
    path: resolvePath("../dist/"),
    library: "Taucharts",
    libraryTarget: "umd",
  },
  entry: {
    taucharts: [resolvePath(`../src/tau.charts.ts`)],
    "taucharts.min": [resolvePath(`../full/taucharts.full.ts`)],
  },
  resolve,
  externals,
  mode: `development`,
  module: webpackModule,
  stats: {
    colors: true,
    reasons: true,
  },
  plugins,
};
