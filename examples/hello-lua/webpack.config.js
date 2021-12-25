const LuaAmalgWebpackPlugin = require('lua-amalg-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Use the plugin in your webpack configuration:
module.exports = {
  // …

  plugins: [
    // Adding the plugin with the default options
    new LuaAmalgWebpackPlugin(),

    // OR:

    // You can choose to pass any supported options to it:
    // new FileListPlugin({
    //   outputFile: 'my-assets.md',
    // }),
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        "a.out.js",
        "a.out.wasm"
      ]
    })
  ],
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      const chokidar = require('chokidar');
      chokidar.watch('src/**/*.lua').on('change', function (event, path) {
        devServer.middleware.invalidate();
        devServer.sendMessage(
          devServer.webSocketServer.clients,
          'content-changed',
        );
      });
    },
  },
};
