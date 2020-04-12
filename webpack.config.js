const path = require('path');
//var nodeExternals = require('webpack-node-externals');

//const fs = require('fs');
module.exports = {
  mode: 'development',
  entry:{ 
	admins: './client/index.js',
	 student: './student.js',
   indexx: './indexx.js'
  },
  output: {
	  path: path.resolve(__dirname,  'public'),
    filename: '[name].bundle.js', // string,
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
//	  devtool: 'inline-source-map'

//   },
//   module: {
//       rules: [
//         {
//           exclude: /node_modules/
//         }]
//       },
// node: {
//     fs: "empty"
  }
// },
//     resolve: {
//       extensions: ['.js']},
// 	externals: [nodeExternals()]
};
