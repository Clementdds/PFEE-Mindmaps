// node modules
const merge = require('webpack-merge');
const path = require('path');

// webpack plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// config files
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');

// Configure Bundle Analyzer
const configureBundleAnalyzer = () => {
    return {
        analyzerMode: 'static',
        reportFilename: 'report-legacy.html',
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

// Configure optimization
const configureOptimization = () => {
    return {
        splitChunks: {
            maxSize: 244000,
            chunks: 'all',
        },
        minimizer: [
            new TerserPlugin(configureTerser()),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                    safe: true,
                    discardComments: true,
                },
            }),
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

// Configure terser
const configureTerser = () => {
    return {
        cache: true,
        parallel: true,
        sourceMap: true,
    };
};

// Production module exports
module.exports = [
    merge(common.legacyConfig, {
        output: {
            filename: path.join('./js', '[name]-legacy.[chunkhash].js'),
        },
        mode: 'production',
        devtool: 'source-map',
        optimization: configureOptimization(),
        module: {
            rules: [configureCssLoader(), configureImageLoader(), configureZipLoader()],
        },
        plugins: [
            new MiniCssExtractPlugin({
                path: path.resolve(__dirname, settings.paths.dist.base),
                filename: path.join('./css', '[name].[chunkhash].css'),
            }),
            new BundleAnalyzerPlugin(configureBundleAnalyzer()),
        ],
    }),
];
