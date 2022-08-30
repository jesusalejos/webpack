const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); only production mode...
//const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');


/** @type {import('webpack').Configuration} */ //no me ha servido

module.exports = {
	entry:'./src/index.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  
  mode: 'development',
  watch: true,
	
	resolve: {
		extensions: ['.js'],
		alias: {
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@tamplates': path.resolve(__dirname, 'src/tamplates/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@images': path.resolve(__dirname, 'src/assets/images/'),
		}
	},
	module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.js$/,
        
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        }
        
      },
      {
      	 test: /\.css|\.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader","stylus-loader"
        ],
      },
      {
      	 test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
        	loader:'url-loader',
        	options: {
        		limit: 10000,
        		mimetype:'application/font/woff',
        		name: '[name].[contenthash].[ext]',
        		outputPath:'./assets/fonts',
        		publicPath:'../assets/fonts',
        		esModule: false,
        	},
        },
        
  	   }
    ]
  },
  plugins: [
    
    new HtmlWebpackPlugin({

      //inyecta el bundle al template html
      inject: 'body',
      //la ruta al template html
      template: './public/index.html',
      //nombre final del archivo
      filename: './index.html' 

    }),
    new MiniCssExtractPlugin({
    	filename:'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
    	patterns: [
    		{
    			from: path.resolve(__dirname, 'src', 'assets/images'),
        		to: 'assets/images'
    		}
    	]
    	
    }),
    new Dotenv(),
  ],
 }
