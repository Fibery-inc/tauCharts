const fs = require("fs");
const plugins = require("./scripts-plugins");
const { resolvePath, resolve } = require("./resolve");
const externals = require("./externals");
const webpackModule = require("./scripts-module");

const pluginsEntry = {
  ["color-brewer"]: resolvePath(`../src/addons/color-brewer`),
};

fs.readdirSync(resolvePath(`../plugins/`)).forEach((file) => {
  if (file.endsWith(".js") || file.endsWith(".ts")) {
    pluginsEntry[file.replace(/(.+)(\.js|\.ts)$/gi, "$1")] = resolvePath(`../plugins/${file}`);
  }
});

module.exports = {
  output: {
    filename: "[name].js",
    path: resolvePath("../dist/plugins"),
    libraryTarget: "umd",
  },
  entry: pluginsEntry,
  resolve,
  externals: {
    ...externals,
    "@fibery/taucharts": {
      commonjs: "@fibery/taucharts",
      commonjs2: "@fibery/taucharts",
      amd: "@fibery/taucharts",
      root: "Taucharts",
    },
  },
  mode: "development",
  module: webpackModule,
  stats: {
    colors: true,
    reasons: true,
  },
  plugins: plugins,
};
