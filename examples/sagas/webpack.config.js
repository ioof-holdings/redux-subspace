require('webpack');
var path = require('path');

module.exports = {
    entry: ['./index.js'],
    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: "#eval-source-map",
    resolve: {
        extensions: ['', '.js', '.jsx', '.html', '.css', '.ttf', '.eot', '.woff', '.woff2', '.gif', '.jpg', '.png', '.ico'],
        modulesDirectories: [
            'node_modules',
            '../lib'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                },
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};
