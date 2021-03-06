const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',

    devServer: {
        inline: true,
        overlay: true,
        host: '0.0.0.0',
        historyApiFallback: true,
    },


    resolve: {
        extensions: ['.js', '.vue']
    },

    entry: {
        app: path.join(__dirname, 'main.js'),

    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        },  {
            test: /\.css$/,
            loader: [
                'vue-style-loader',
                'css-loader',
            ]
            }
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
};