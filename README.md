<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# lua-amalg-webpack-plugin

This plugin uses <a href="https://github.com/siffiejoe/lua-amalg">lua-amalg</a> to bundle your Lua scripts.

## Getting Started

To begin, you'll need to install `lua-amalg-webpack-plugin`:

```console
npm install --save-dev lua-amalg-webpack-plugin
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
const LuaAmalgWebpackPlugin = require('lua-amalg-webpack-plugin');

module.exports = {
  plugins: [new LuaAmalgWebpackPlugin()],
};
```

And run `webpack` via your preferred method.

## Options

|              Name               |   Type   |    Default     | Description                                 |
| :-----------------------------: | :------: | :------------: | :------------------------------------------ |
|       **[`main`](#main)**       | `String` | `src/main.lua` | Primary entry point to your program.        |
| **[`outputFile`](#outputFile)** | `String` |  `bundle.lua`  | Concatenate and emit output to single file. |

### `main`

Type: `String`
Default: `src/main.lua`

Primary entry point to your program.

```js
module.exports = {
  plugins: [
    new LuaAmalgWebpackPlugin({
      main: 'src/main.lua',
    }),
  ],
};
```

### `outputFile`

Type: `String`
Default: `bundle.lua`

Concatenate and emit output to single file.

```js
module.exports = {
  plugins: [
    new LuaAmalgWebpackPlugin({
      outputFile: 'bundle.lua',
    }),
  ],
};
```

# Examples

* [hello-lua](examples/hello-lua/README.md)

# License

[MIT](./LICENSE)
