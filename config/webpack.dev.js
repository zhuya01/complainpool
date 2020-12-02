const path = require('path');

const port = 8081;
module.exports = {
    mode: "development",
    devServer: {
        compress: true,
        host: "127.0.0.1",
        port: port,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        },
        disableHostCheck: true,
        hot: true,
        contentBase: false,
        publicPath: '/',
    },
    entry: './src/index.js',
    devtool: "eval-source-map",
    output: {
        libraryTarget: "umd",
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'http://127.0.0.1:' + port + '/',
    },
    externals: {
        react: "react",
        "react-dom": "react-dom",
        "react-router-dom": "react-router-dom",
        "react-relay": "react-relay",
        graphql: "graphql",
        "funweb-lib": "funweb-lib",
        antd: "antd",
        "@ant-design/icons": "@ant-design/icons",
        moment: "moment",
        "moment/locale/zh-cn": "moment/locale/zh-cn"
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),
                            failOnError: true,
                        },
                        loader: 'eslint-loader',
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: (resourcePath) => {
                                    if (/global.css$/i.test(resourcePath)) {
                                        return 'global';
                                    }
                                    return 'local';
                                },
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    },
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: (resourcePath) => {
                                    if (/global.scss$/i.test(resourcePath)) {
                                        return 'global';
                                    }
                                    return 'local';
                                },
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'media',
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                        }
                    }
                ]
            }
        ]
    },
};
