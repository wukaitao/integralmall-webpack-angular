const path = require('path');//路径中间件

module.exports = {
	entry: {
		vendor: [
			'./bower_components/jquery/dist/jquery.js'
		],
		main: [
			'./client/main.js'
		]
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015','react']
				}
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/images/[name].[hash].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/fonts/[name].[hash].[ext]'
				}
			},
			{
				test: path.resolve(__dirname,'../bower_components/jquery/dist/jquery.js'),
				loader: 'expose?jQuery!expose?$'
			},
			{
				test: path.resolve(__dirname,'../bower_components/fetch/fetch.js'),
				loader: 'expose?fetch'
			}
		]
	}
};