// When define separate config for dev, prod, and test ENV. 
// All three have some config in common. 
// That why we define webpack.common.js here 



const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
//var ExtractTextPlugin = require("extract-text-webpack-plugin"); extract css out of html head, be a separate file bundle.css

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'OMOS',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  /*
   * Static metadata for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  /*
   * Cache generated modules and chunks to improve performance for multiple incremental builds.
   * This is enabled by default in watch mode.
   * You can pass false to disable it.
   *
   * See: http://webpack.github.io/docs/configuration.html#cache
   */
   //cache: false,

  /*
   * Split APP into several bundles
   * --------------------------------
   * We feed Webpack with serval entry files and 
   * let it find and incorporate the dependencies 
   * that radiate from those entries,
   * it will constructs separate dependency graphs (depend on number of the ertries)
   * 
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {

    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':      './src/main.browser.ts'

  },
  
  /*
   * Options affecting the resolving of modules.
   * find file for import statement such as : 
   * import { AppComponent } from './app.component.ts';
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     * add .css and .html is ok
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js','.css'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules'],

    alias: {
      // legacy imports pre-rc releases
      'angular2': helpers.root('node_modules/@angularclass/angular2-beta-to-rc-alias/dist/beta-17')
    },

  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /*
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    preLoaders: [

      /*
       * Tslint loader support for *.ts files
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
       // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

      /*
       * Source map loader support for *.js files
       * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
       *
       * See: https://github.com/webpack/source-map-loader
       */
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
        ]
      }

    ],

    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * Webpack itself doesn't know what to do with a non-JavaScript file. 
     * We teach it to process such files into JavaScript with loaders
     *
     * It is used for when Webpack encounters import statements like 
     * import { AppComponent } from './app.component.ts';
     * import 'uiframework/dist/uiframework.css';
     *
     * 
     * 
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [

      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      /*
       * reference https://angular.io/docs/ts/latest/guide/webpack.html
       */
      // {
      //   test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      //   loader: 'file?name=assets/[name].[hash].[ext]'
      // },
      /*
       * Raw loader support for *.css files
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },

      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      /* to-string & css-raw-loader do the same thing for 
       * Returns file content as string
       * but it's still dont work, 
       * see the description for temp fixing such bug  in app.component.ts
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        //loaders: ['to-string', 'css', 'sass']
        // loader: 'css-raw-loader!sass-loader'
        loader: 'style-loader!css-loader!sass-loader'
      }      

    ]

  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),

    /*
     * Plugin: OccurenceOrderPlugin
     * Description: Varies the distribution of the ids to get the smallest id length
     * for often used ids.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
     * See: https://github.com/webpack/docs/wiki/optimization#minimize
     */
    new webpack.optimize.OccurenceOrderPlugin(true),

    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     * vendor.js & app.js may has shared dependiencies, 
     * without CommonsChunkPlugin, Webpack is not smart enough to keep the vendor code out of the app.js bundle
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    /*
     * Plugin: HtmlWebpackPlugin
     * inject those scripts and links which generated(bundle) 
     * by webpack into index.html dynamically at runtime.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    /*
     * Plugin: HtmlHeadConfigPlugin
     * Description: Generate html tags based on javascript maps.
     *
     * If a publicPath is set in the webpack output configuration, it will be automatically added to
     * href attributes, you can disable that by adding a "=href": false property.
     * You can also enable it to other attribute by settings "=attName": true.
     *
     * The configuration supplied is map between a location (key) and an element definition object (value)
     * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
     *
     * Example:
     *  Adding this plugin configuration
     *  new HtmlElementsPlugin({
     *    headTags: { ... }
     *  })
     *
     *  Means we can use it in the template like this:
     *  <%= webpackConfig.htmlElements.headTags %>
     *
     * Dependencies: HtmlWebpackPlugin
     */
    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    })
  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
