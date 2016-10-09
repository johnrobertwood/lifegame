var path = require('path');
module.exports = {
    entry: './app.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    devServer: { inline: true },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-1' },
        { test: /\.sass$/, loaders: ["style", "css", "sass"] }
      ]
    }
}