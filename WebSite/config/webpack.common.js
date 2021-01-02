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
                        '@babel/plugin-proposal-class-properties',
                    ],
                },
            },
        ],
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
                    name: './img/[name].[hash].[ext]',
                },
            },
        ],
    };
};

// Configure the css loader
const configureScssLoader = () => {
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

const configureFavicon = () => {
    return {
        favicon : './public/favicon.ico'
    };
};

// The base webpack config
const baseConfig = {
    name: pkg.name,
    entry: configureEntries(),
    output: {
        path: path.resolve(__dirname, settings.paths.dist.base),
        filename: './js/[name].[hash].js',
    },
    module: {
        rules: [configureImageLoader(), configureScssLoader()],
    },
    plugins: [
        new WebpackNotifierPlugin({
            title: 'Webpack',
            excludeWarnings: true,
            alwaysNotify: true,
        }),
        new ManifestPlugin(configureManifest('manifest.json')),
        new HtmlWebpackPlugin(configure200Html()),
        new HtmlWebpackPlugin(configureFavicon()),
        new HtmlWebpackPlugin(configureIndexHtml()),
    ],
};

const browsersConfig = {
    module: {
        rules: [
            configureBabelLoader(Object.values(pkg.browserslist.modernBrowsers)),
        ],
    }
};

// Put here base values to be passed to the website, use .env if you want to changes values for yourself
const valuesConfig = {
    plugins: [
        new EnvironmentPlugin([
            'API_BackEnd',
          ]),
    ],
};

// noinspection WebpackConfigHighlighting
module.exports = {
    legacyConfig: merge.strategy({
        module: 'prepend',
        plugins: 'prepend',
    })(baseConfig, browsersConfig, valuesConfig),
};
