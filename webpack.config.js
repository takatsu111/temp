const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
// vue-loader@15から必要
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const MODE = 'development';

const ENABLE_SOURCE_MAP = (MODE === 'development');


module.exports = {
    mode: MODE,
    entry: {
        app: "./assets/js/index.js",
        style: "./assets/sass/index.scss"
    },
    output: {
        filename: "js/[name].js",
        path: path.join(__dirname, 'htdocs'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
         new VueLoaderPlugin()
    ],
    optimization: {
        // production minify
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            })
        ],
    },
    module: {
        rules: [
             {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
            
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            },
            // Babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                            ]
                        }
                    }
                ]
            },
            // ESLint
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader',
                    },
                ]
            },
            // SCSS
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: ENABLE_SOURCE_MAP,
                            importLoaders: 2
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: ENABLE_SOURCE_MAP,
                        }
                    },

                ],
            },
            // image base64 encode
            {
                test: /\.(jpg|gif|png)$/,
                loaders: 'url-loader'
            },
        ]
    },
     resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            "node_modules"
        ],
        alias: {
            // vue.js のビルドを指定する
            vue: 'vue/dist/vue.esm.js'
        }
    }
};