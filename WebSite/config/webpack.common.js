// node modules
const path = require('path');
const merge = require('webpack-merge');

// webpack plugins
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {EnvironmentPlugin} = require('webpack');

// config files
const pkg = require('../package.json');
const settings = require('./webpack.settings.js');

// Configure Babel loader
const configureBabelLoader = (browserList) => {
    return {
        test: /\.js$/,
        exclude: [/(node_modules)/],
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    sourceType: 'unambiguous',
                    presets: [
                        '@babel/preset-react',
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: browserList,
                                },
                            },
                        ],
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-class-properties',
                    ],
                },
            },
        ],
    };
};

// Configure Entries
const configureEntries = () => {
    let entries = {};
    for (const [key, value] of Object.entries(settings.entries)) {
        entries[key] = path.resolve(__dirname, settings.paths.src.base + value);
    }

    return entries;
};

const configureManifest = (fileName) => {
    return {
        fileName: fileName,
        basePath: settings.manifestConfig.basePath,
        map: (file) => {
            file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
            return file;
        },
    };
};

const configureIndexHtml = () => {
    return {
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
    };
};

const configure200Html = () => {
    return {
        template: './public/index.html',
        filename: '200.html',
        inject: true,
    };
};

// The base webpack config
const baseConfig = {
    name: pkg.name,
    entry: configureEntries(),
    output: {
        path: path.resolve(__dirname, settings.paths.dist.base),
        publicPath: settings.urls.publicPath(),
    },
    module: {
        rules: [configureBabelLoader()],
    },
    plugins: [
        new WebpackNotifierPlugin({
            title: 'Webpack',
            excludeWarnings: true,
            alwaysNotify: true,
        }),
        new ManifestPlugin(configureManifest('manifest.json')),
        new HtmlWebpackPlugin(configureIndexHtml()),
        new HtmlWebpackPlugin(configure200Html()),
    ],
};

const browsersConfig = {
    module: {
        rules: [
            configureBabelLoader(Object.values(pkg.browserslist.modernBrowsers)),
        ],
    }
};

// Put here values to be passed to the website
const valuesConfig = {
    plugins: [
        new EnvironmentPlugin({
            API_BackEnd: 'https://localhost/'
        }),
    ],
};

// noinspection WebpackConfigHighlighting
module.exports = {
    legacyConfig: merge.strategy({
        module: 'prepend',
        plugins: 'prepend',
    })(baseConfig, browsersConfig, valuesConfig),
};
