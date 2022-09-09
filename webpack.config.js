const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
// console.log('isDev', isDev);

const plugins = () => {

    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets/33.ico'), to: path.resolve(__dirname, 'dist') },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        })

    ]

    base.push(new BundleAnalyzerPlugin()); 

    return base;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // mode: "development",
    mode: "production",
    entry: {
        main: "./index.js",
        analytics: './analytics.js',
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: ['.js', '.jsx', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: plugins(),

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // hmr: isDev,
                        // reloadAll: true
                    },
                }, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                dependency: { not: ['url'] },
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

}
