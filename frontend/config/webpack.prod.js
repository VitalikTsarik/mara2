const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },

            {
                test: /\.(jpe?g|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ]
                ,
            },
        ],
    },
});
