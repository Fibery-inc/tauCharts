const webpack = require("webpack");
const banner = require("./banner");

module.exports = [
  banner,
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(require("../package.json").version),
  }),
];
