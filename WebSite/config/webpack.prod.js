// node modules
const merge = require('webpack-merge');
const path = require('path');

// webpack plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// config files
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');


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

// Configure terser
const configureTerser = () => {
    return {
        cache: true,
        parallel: true,
        sourceMap: true,
    };
};

// Configure Bundle Analyzer
const configureBundleAnalyzer = () => {
    return {
        analyzerMode: 'static',
        reportFilename: 'report-legacy.html',
    };
};

// Production module exports
module.exports = [
    merge(common.legacyConfig, {
        output: {
            filename: path.join('/js/','[name].[chunkhash].js'),
        },
        mode: 'production',
        devtool: 'source-map',
        optimization: configureOptimization(),
        plugins: [
            new MiniCssExtractPlugin({
                path: path.resolve(__dirname, settings.paths.dist.base),
                filename: path.join('css/', '[name].[chunkhash].css'),
            }),
            new BundleAnalyzerPlugin(configureBundleAnalyzer()),
        ],
    }),
];

