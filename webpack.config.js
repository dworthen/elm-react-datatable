var webpack = require('webpack');
var argv = require('yargs').argv;

module.exports = {
    context: __dirname,
    devtool: argv.hot ? "#eval" : "#source-map",
    entry: argv.hot ? './index.js' : './src/index.js',
    output: {
        filename: argv.hot ? './docs/client.min.js' : './dist/elm-react-datatable.js',
        library: !argv.hot ? 'elm-react-datatable' : undefined,
        libraryTarget: !argv.hot ? 'commonjs' : undefined // or commonjs2
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ],
    module: {
        loaders: [
            {
                test: /\.elm$/,
                exclude: /node_modules|elm-stuff/,
                loader: 'elm-webpack'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'latest', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/vnd.ms-fontobject"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=image/svg+xml"
            }
        ],
    }
};