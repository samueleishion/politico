var webpack = require('webpack'); 
var ExtractText = require('extract-text-webpack-plugin'); 

module.exports = {
	entry: {
		app: [
			"./src/scrs/main.js" 
		]
	}, 
	output: {
		publicPath: "http://localhost:3000", 
		filename: "./static/scrs/bundle.js" 
	}, 
	watch: true, 
	module: {
		loaders: [
			{
				test: /\.js$/, 
				exclude: /node_modules/, 
				loaders: ['jsx','babel']
			}, 
			{
				test: /\.scss$/, 
				loader: ExtractText.extract('css!sass')
			}, 
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "url-loader?limit=10000&minetype=applciation/font-woff"
			}, 
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "file-loader" 
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}, 
	resolve: {
		modulesDirectories: ['src/scrs/components','node_modules']
	}, 
	plugins: [
		new ExtractText('static/stys/styles.css', {
			allChunks: true 
		})
	]
}; 