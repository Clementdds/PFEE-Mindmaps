require('dotenv').config();

// Webpack settings exports
// noinspection WebpackConfigHighlighting
module.exports = {
    paths: {
        src: {
            base: '../src/',
        },
        template: '../src/',
        dist: {
            base: '../dist/',
            clean: ['**/*'],
        },
    },
    urls: {
        publicPath: () => process.env.PUBLIC_PATH || '/',
    },
    vars: {
        cssName: 'styles',
    },
    entries: {
        app: 'index.js',
    },
    copyWebpackConfig: [
        {
            from: './dist/index.html',
            to: '200.[ext]',
        },
    ],
    devServerConfig: {
        public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:3000',
        host: () => process.env.DEVSERVER_HOST || 'localhost',
        poll: () => process.env.DEVSERVER_POLL || false,
        port: () => process.env.DEVSERVER_PORT || 3000,
        https: () => process.env.DEVSERVER_HTTPS || false,
    },
    manifestConfig: {
        basePath: '',
    },
};
