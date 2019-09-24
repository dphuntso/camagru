const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    watch: true,
    entry: "./src/index.js", //relative to root of the application
    output: {
        path: __dirname + '/public/dist',
        filename: "bundle.js" //relative to root of the application
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css']
    },
    module: {
       rules: [
           {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // {
            //     test: /\.s?css$/,
            //     use: CSSExtract.extract(
            //       {
            //         use: [
            //           {
            //             loader: 'css-loader',
            //             options: {
            //               sourceMap: true
            //             }
            //           },
            //           {
            //             loader: 'sass-loader',
            //             options: {
            //               sourceMap: true
            //             }
            //           }
            //         ]
            //       }
            //     )
            //   }
            // {
            //     test: /\.css$/,
            //     use: {
            //         loader: 'css-loader',
            //     }
            // }
            {
                test: /\.css$/i,
                use: [{loader: 'style-loader'},{loader:'css-loader'}],
            }
        ]
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    },
    devServer: {disableHostCheck: true,
        contentBase: path.join(__dirname, 'public/dist'),
        historyApiFallback: true,
        publicPath: '/dist/',
    },
}