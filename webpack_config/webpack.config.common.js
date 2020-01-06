const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );      //нужен для создания файла CSS для каждого файла JS, который содержит CSS

const config = {
    entry: './src/index.js',
    output: {                                                           //output у prod и dev один
        filename: 'main.js',
        path: path.resolve( __dirname, '../build' ),
    },

    plugins: [
        new HtmlWebpackPlugin( {
            template: 'index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1',
            }
        } ),
        new MiniCssExtractPlugin( ),
    ],

    module: {
        rules: [
            /*
            STYLES RULE
            для обработки стилей
            */
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: (loader) => [
                                require( 'autoprefixer' ),
                                require( 'cssnano' ),
                            ]
                        }
                    },
                    'sass-loader',
                ],
            },

            /*
            IMAGES RULE
            для обработки картинок с указанными разрешениями с помощью file-loader
            */
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',                       //каждый файл при build будет создаваться с именем [name] и расширением [ext]
                            outputPath: 'assets/images',                //путь, где будет создаваться файл
                            publicPath: 'assets/images',                //для ссылок
                        }
                    }
                ]
            },
            /*
            FONTS RULE
            для обработки файлов со шрифтами с указанными разрешениями с помощью file-loader
            */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',                       //каждый файл при build будет создаваться с именем [name] и расширением [ext]
                            outputPath: 'assets/fonts',                 //путь, где будет создаваться файл
                            publicPath: 'assets/fonts',                 //для ссылок
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;