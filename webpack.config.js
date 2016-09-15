var path = require('path');

module.exports = {
    entry: "./app.jsx",
    output: {
      path: 'public',
      filename: "bundle.js"
    },
    devServer: { inline: true },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: "jsx-loader" },
        { test: /\.scss$/, loaders: ["style", "css", "sass"] }
      ]
    }
}