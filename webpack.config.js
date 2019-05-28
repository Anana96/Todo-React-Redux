const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (env, argv) => ({
    entry:{
        app: './src/index.js'
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        sourceMapFilename: "[name].js.map",
    },
    devtool: (argv.mode === 'production')? 'cheap-source-map': 'eval',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options:
                    {
                        config: {path: './postcss.config.js'}
                    }
                }
            ]
        },
        {
            test: /\.scss$/,
            use:[
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                {
                    loader: 'postcss-loader',
                    options:
                    {
                        config: {path: './postcss.config.js'}
                    }
                }
            ]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
        }
    ]},
    devServer: {
        contentBase: 'dist/',
        overlay: true,
        historyApiFallback: true,
    },
    optimization: {
        minimizer: [ new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new MinifyPlugin(),
        new HtmlWebpackPlugin({
            template: `./src/index.html`,
            filename: 'index.html'
        })
    ]
})