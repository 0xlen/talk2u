var path = require('path');

module.exports = {
    entry: './app/main.js',

    output: {
        path: './build/',
        filename: 'bundle.js'       
    },

    module: {
        loaders: [
            { test: /\.coffee$/, loader: 'coffee-loader' },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    }
};

