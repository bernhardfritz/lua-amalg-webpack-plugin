const { execSync } = require('child_process');
const path = require('path');

class LuaAmalgWebpackPlugin {
  static defaultOptions = {
    main: 'src/main.lua',
    outputFile: 'bundle.lua',
  };

  // Any options should be passed in the constructor of your plugin,
  // (this is a public API of your plugin).
  constructor(options = {}) {
    // Applying user-specified options over the default options
    // and making merged options further available to the plugin methods.
    // You should probably validate all the options here as well.
    this.options = { ...LuaAmalgWebpackPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = LuaAmalgWebpackPlugin.name;

    // webpack module instance can be accessed from the compiler object,
    // this ensures that correct version of the module is used
    // (do not require/import the webpack or any symbols from it directly).
    const { webpack } = compiler;

    // Compilation object gives us reference to some useful constants.
    const { Compilation } = webpack;

    // RawSource is one of the "sources" classes that should be used
    // to represent asset sources in compilation.
    const { RawSource } = webpack.sources;

    // Tapping to the "thisCompilation" hook in order to further tap
    // to the compilation process on an earlier stage.
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      // Tapping to the assets processing pipeline on a specific stage.
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,

          // Using one of the later asset processing stages to ensure
          // that all assets were already added to the compilation by other plugins.
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_COUNT,
        },
        (assets) => {
          const srcDir = path.dirname(this.options.main);
          const stdout = execSync(
            `export LUA_PATH="${path.resolve(
              __dirname,
              './?.lua',
            )};${path.resolve(
              process.cwd(),
              `${srcDir}/?.lua`,
            )};;" && lua -lamalg ${
              this.options.main
            } 1> /dev/null && lua ${path.resolve(
              __dirname,
              './amalg.lua',
            )} -s ${this.options.main} -c`,
          );
          compilation.emitAsset(this.options.outputFile, new RawSource(stdout));
        },
      );
    });
  }
}

module.exports = LuaAmalgWebpackPlugin;
