const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    contentScript: path.join(__dirname, 'src/content_script.js'),
    background: path.join(__dirname, 'src/background.js'),
    popup: path.join(__dirname, 'src/popup.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": {
                  "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                },
              }],
            ],
            plugins: [
              ["@babel/plugin-transform-runtime"],
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}