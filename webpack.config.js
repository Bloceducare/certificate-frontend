
const path = require('path');

module.exports = {
  mode: 'development',
  entry:{ 
	admins: './client/index.js',
	 student: './student.js'
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

  }
};
