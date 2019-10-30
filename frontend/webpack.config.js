const path = require('path');

const DEBUG = true;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static/frontend/'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: DEBUG ? '[local]' : '[hash:base64:5]',
                            },
                            sourceMap: DEBUG,
                        },
                    },
                    {
                        loader: 'less-loader',
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
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
};
