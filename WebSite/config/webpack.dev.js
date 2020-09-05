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

// Configure Image loader
const configureImageLoader = () => {
    return {
        test: /\.(png|jpe?g|gif|svg|webp|woff(2)?|ttf|eot)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash].[ext]',
                },
            },
        ],
    };
};

// Configure zip loader
const configureZipLoader = () => {
    return {
        test: /\.(zip)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'game/[name].[ext]',
                },
            },
        ],
    };
};

// Configure the css loader
const configureCssLoader = () => {
    return {
        test: /\.(scss|css)$/,
        use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
};

// Development module exports
module.exports = merge(common.legacyConfig,
    {
        output: {
            filename: '[name].[hash].js',
            publicPath: settings.devServerConfig.public() + '/',
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: configureDevServer(),
        module: {
            rules: [configureCssLoader(), configureImageLoader(), configureZipLoader()],
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
    })
;
