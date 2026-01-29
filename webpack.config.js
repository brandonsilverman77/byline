// For inspiration on your webpack configuration, see:
// https://github.com/shakacode/react_on_rails/tree/master/spec/dummy/client
// https://github.com/shakacode/react-webpack-rails-tutorial/tree/master/client

const webpack = require('webpack');
const path = require('path');
const  { resolve } = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCSSExctractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

function config(params) {
  console.log("reading config", params);
  
  const production = params.production;
  const mode = production ? "production" : "development";
  console.log("mode", mode, "production", production);
  
  let c = {
    context: resolve(__dirname),
    entry: {
      'webpack-bundle': [
        'es5-shim/es5-shim',
        'es5-shim/es5-sham',
        'whatwg-fetch',
        '@babel/polyfill',
        './client/app.jsx',
      ],
    },
    devtool: 'source-map',
    mode: mode,
    module: {
      rules: [
        {
        test: /\.(scss|css)$/,
        use: [
          
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]",
              modules: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          },
        
        ]
      },
        {
          test: require.resolve('react'),
          use: {
            loader: 'imports-loader',
            options: {
              shim: 'es5-shim/es5-shim',
              sham: 'es5-shim/es5-sham',
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(jsx|js)$/,
          use: [{
            loader: 'cache-loader',
            options: {
              cacheDirectory: 'webpack-cache'
            }
          }, 'babel-loader'],
          exclude: /node_modules/,
        }
      ],
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
         chunks: 'all',
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendor',
             chunks: 'all'
           }
         }
       }
    },
    output: {
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode, // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: false,
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.scss', '.css'],
      alias: {
        UI: path.resolve(__dirname, 'client/ui/'),
        ActionCreators: path.resolve(__dirname, 'client/action-creators/'),
        Models: path.resolve(__dirname, 'client/models/'),
        Reducers: path.resolve(__dirname, 'client/reducers/'),
        Views: path.resolve(__dirname, 'client/views/'),
        Utilities: path.resolve(__dirname, 'client/utilities/'),
        Icons: path.resolve(__dirname, 'client/icons/'),
        Pages: path.resolve(__dirname, 'client/pages/'),
        Templates: path.resolve(__dirname, 'client/templates/'),
        Mutations: path.resolve(__dirname, 'client/mutations/'),
        CSS: path.resolve(__dirname, 'client/css/'),
        Connection: path.resolve(__dirname, 'client/connection/')
      }
    },
    watchOptions: {
      ignored: /node_modules/
    },
  };
  
  if (production) {
    c.plugins.push(new MiniCSSExctractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[name].css"
    }));
    
    c.devtool = 'none';
    
    // remove style loader
    c.module.rules[0].use[0] = {
      loader: MiniCSSExctractPlugin.loader,
      options: {
        // you can specify a publicPath here
        // by default it use publicPath in webpackOptions.output
        publicPath: '/'
      }
    }
    
    c.optimization.minimizer = [new TerserPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    })];
  }
  
  console.log(c);
  
  return  c;
}



module.exports = function(params) {
  return config(params);
}

