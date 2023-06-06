const WebpackDevServer = require(`webpack-dev-server`);
const webpack = require(`webpack`);
const path = require("path");
const conf = require(`./webpack.config`);
const WATCHER_SERVER_LISTENING_PORT = process.env.WEBPACK_PORT || 8080;

const compiler = webpack(conf);

const server = new WebpackDevServer(compiler, {
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
  quiet: true,
  noInfo: true,
  open: true,
  hot: true,
  historyApiFallback: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false,
  },
  disableHostCheck: true,
  headers: {
    "Access-Control-Allow-Origin": `*`,
  },
  stats: `errors-only`,
});
server.listen(WATCHER_SERVER_LISTENING_PORT);
