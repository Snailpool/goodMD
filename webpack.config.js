const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// envieroment setting
const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
let plugins = [];
let cssLoader = {};
let cssIdentName = '';

// if it's production time
if (PRODUCTION) {
    cssLoader =
        ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: false
                    }
                },
                {
                    loader: 'postcss-loader',   // TODO: 紀錄下來：卡了五小時結果是沒升級 => 先查詢相依版本再改寫法
                    options: {
                      plugins: function () {
                        return [
                            require('postcss-cssnext')
                        ];
                      }
                    }
                }
            ]
        });
    plugins = [
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ];
}
// if it's development time
else if (DEVELOPMENT) {
    plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
    ];
    cssLoader = [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: false
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                      plugins: function () {
                        return [
                            require('postcss-cssnext')
                        ];
                      }
                    }
        }
    ];
}

// main webpack config setting
module.exports = {
    entry: {
        app: ['react-hot-loader/patch','./src/app/index.js']    // in case there are another apps
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
        publicPath: '/public'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, './src/app/')
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/images/[hash:6].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: cssLoader,
                include: [
                    path.resolve(__dirname, './src/app/components/')
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src/client'),
        compress: true,
        hot: true,
        port: 3000
    },
    plugins: plugins
}



// var webpack = require('webpack');
// var path = require('path');

// module.exports = {
//     devtool: 'inline-source-map',
//     entry: [
//         'react-hot-loader/patch',
//         './src/app/index.js'
//     ],
//     devServer: {
//         contentBase: path.resolve(__dirname, './src/client'),
//         compress: true,
//         hot: true,
//         port: 3000
//     },
//     output: {
//         path: path.resolve(__dirname, 'public'),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//                 include: [
//                     path.resolve(__dirname, './src/app/')
//                 ]
//             },
//             {
//                 test: /\.css$/,
//                 use: [  
//                     {
//                         loader: 'style-loader'
//                     },
//                     {
//                         loader: 'css-loader',
//                     }
//                 ],
//                 include: [
//                     path.resolve(__dirname, '../src/app/components/')
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NamedModulesPlugin()
//     ]
// };