const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("node:path");

module.exports = {
  // untuk beberapa entry point
  entry: {
    index: "./js/index.js",
    contact: "./js/contact.js",
    projects: "./js/projects.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // [...] otomatis sesui entry point
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/i,
      //   loader: "html-loader",
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                style: "compressed",
                loadPaths: ["scss", "sass"],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  // plugin yang akan  combine  js ke html sesui chunks yang di define di entry
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./contact.html",
      filename: "contact.html",
      chunks: ["contact"],
    }),

    new HtmlWebpackPlugin({
      template: "./projects.html",
      filename: "projects.html",
      chunks: ["projects"],
    }),
  ],
};
