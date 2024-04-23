// const path = require("path");

// module.exports = {
//   mode: "development",
//   entry: path.resolve(__dirname, "src", "app"),
//   output: {
//     path: path.resolve(__dirname, "public"),
//     filename: "bundle.js",
//     publicPath: "/",
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//   },
//   devServer: {
//     historyApiFallback: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?/,
//         loader: "babel-loader",
//       },
//     ],
//   },
// };

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src", "app"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

