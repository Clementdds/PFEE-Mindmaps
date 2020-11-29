// node modules
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// config files
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');

// Configure the webpack-dev-server
const configureDevServer = () => {
    return {
        public: settings.devServerConfig.public(),
        contentBase: path.resolve(__dirname, settings.paths.template),
        host: settings.devServerConfig.host(),
        port: settings.devServerConfig.port(),
        https: !!parseInt(settings.devServerConfig.https()),
        disableHostCheck: true,
        hot: true,
        overlay: true,
        watchContentBase: true,
        watchOptions: {
            poll: !!parseInt(settings.devServerConfig.poll()),
            ignored: /node_modules/,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
    };
};



// Development module exports
module.exports = merge(common.legacyConfig,
    {
        output: {
            filename: './js/[name].[hash].js',
            publicPath: settings.devServerConfig.public() + '/',
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: configureDevServer(),
        plugins: [new webpack.HotModuleReplacementPlugin()],
    })
;
