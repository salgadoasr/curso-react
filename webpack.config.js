/* eslint-disable import/no-commonjs, global-require */
const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, args) => ({
  context: path.join(__dirname, "src"),
  entry: "main.jsx",

  mode: args.mode,

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: require("./babel.config.js"),
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [args.mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.raw\.jsx$/,
        exclude: /node_modules/,
        use: "raw-loader",
      },
    ],
  },

  // Resoluciones
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },

  plugins: [
    // Inline de variables de entorno en el código transpilado
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(args.mode),
      },
    }),

    // Emitir un fichero index.html
    new HtmlWebPackPlugin({
      title: "Examples!",
      template: "./index.ejs",
    }),

    // Extraer las CSS a un fichero (solo para el paquete de producción)
  ].concat(args.mode === "production" ? new MiniCssExtractPlugin({ filename: "[name].css" }) : []),

  // Ajustes del feedback por consola de webpack
  stats: {
    colors: true,
  },

  // Evitar problemas con librerías node/browser que requieren código node
  // incondicionalmente
  node: {
    fs: "empty",
  },

  // Configuración del servidor de desarrollo
  devServer: {
    host: "localhost",
    port: 3030,

    // Todas las peticiones a URLs desconocidas sirven el index.html
    // Obligatorio para que funcione el router de la SPA.
    historyApiFallback: true,

    // Activar Hot Module Replacement
    // https://webpack.js.org/concepts/hot-module-replacement
    hot: true,

    // Deshabilitar la compresión
    compress: false,

    // Mostrar un overlay en el navegador en caso de errores/warnings
    overlay: {
      warnings: true,
      errors: true,
    },

    before: require("./webpack.server.config.js"),
  },
});
