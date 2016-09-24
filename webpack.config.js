module.exports = {
    entry: "./app.js",
    output: {
      path: 'public',
      filename: "bundle.js"
    },
    devServer: { inline: true },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-1' },
        { test: /\.scss$/, loaders: ["style", "css", "sass"] }
      ]
    }
}