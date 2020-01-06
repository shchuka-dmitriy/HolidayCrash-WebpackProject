const merge = require('webpack-merge');
const commonConfig = require('../webpack_config/webpack.config.common.js');
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );                      //для очистки перед каждой сборкой, чтобы генерировались только используемые файлы (если напр структура поменяется)

const productionConfig = merge(commonConfig, {
    mode: 'production',
    optimization: {
        splitChunks: {                                                                 //для извлечения CSS в одном файле CSS с помощью optimization.splitChunks.cacheGroups
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.(c|sa|sc)ss$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
});

module.exports = productionConfig;