const HtmlWebpackPlugin =  require('html-webpack-plugin');//生成html中间件
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';//热重载(重新刷新)
const proxyMiddleware = require('http-proxy-middleware');//代理服务器
const webpack = require('webpack');//打包工具
const merge = require('webpack-merge');//合并
const path = require('path');//路径中间件
const express = require('express');//框架
const opn = require('opn');//浏览器打开地址
const app = express();//web框架
const port = '1024';//端口
const publicPath = 'http://localhost:'+port+'/';
const baseWebpackConfig = require('./config');//基本打包配置

const config = merge(baseWebpackConfig,{
	entry: {
		main: [
			hotMiddlewareScript
		]
	},
	output: {
		path: '/',//因为文件运行在内存,所以输出路径不同(相对于静态目录)
		publicPath: publicPath,//因为文件运行在内存,内联路径不同
		filename: '[name].[hash].js'//文件名
	},
	devtool: 'source-map',//开发模式(配置显示合并前的js文件,去除则显示合并后的js文件)
	module: {
		loaders: [
			{
				test: /\.(css|scss)$/,
				loaders: ['style','css?sourceMap','resolve-url','sass?sourceMap']
			}
		]
	},
	plugins: [
  		new webpack.optimize.OccurenceOrderPlugin(),
  		new webpack.HotModuleReplacementPlugin(),//热重载
  		new webpack.NoErrorsPlugin(),//报错而不退出webpack进程
  		new HtmlWebpackPlugin({
  			filename: 'index.html',//文件名
  			title: 'my first project by webpack.',//标题(会被template模板覆盖)
  			template: path.resolve(__dirname,'../client/main.html'),//模板
  			inject: true//是否插入到body
  		})
  	]
});

//注入服务器/热重载
const compiler = webpack(config);//配置
//服务器
const devMiddleWare = require('webpack-dev-middleware')(compiler,{
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});
//热重载
const hotMiddleWare = require('webpack-hot-middleware')(compiler);
//热重载html
/*
compiler.plugin('compilation',function(compilation){
	compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
		hotMiddleWare.publish({action: 'reload'});
		cb();
	});
});
*/
app.use(devMiddleWare);//注入服务器
app.use(hotMiddleWare);//注入热重载
app.use(express.static('./client'));//静态目录
//代理服务器
const proxyTable = {
	'/hmc_ghb_server/': {
		target: 'http://hms-uat.cignacmb.com/hmc_ghb_server/',
		changeOrigin: true,
		pathRewrite: {
			'^/hmc_ghb_server/': ''
		}
	}
};
Object.keys(proxyTable).forEach(function(key){
	const options = proxyTable[key];
	typeof options=='string'&&(options={target: options});
	app.use(proxyMiddleware(key,options));
});
app.listen(port,function(e){
	console.log(`server start at http://localhost:${port}`);
	opn(`http://localhost:${port}`);
});