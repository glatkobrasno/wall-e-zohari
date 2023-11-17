const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
	login: './src/Components/Login.js',
	signUp: './src/Components/SignUp.js',
  },
  output: {
    path: path.resolve(__dirname, 'static/js'), // Adjust the output path as needed
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
	  {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
	  core: path.join(__dirname, 'core'),
    },
  },
  optimization: {
    concatenateModules: false,
    providedExports: false,
    usedExports: false,
  },
};