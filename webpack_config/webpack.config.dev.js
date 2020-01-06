const path = require( 'path' );
const merge = require('webpack-merge');
const commonConfig = require('../webpack_config/webpack.config.common.js');

const developmentConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join( __dirname, '../build' ),
    },

});

module.exports = developmentConfig;