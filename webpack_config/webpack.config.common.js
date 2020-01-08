const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );             //нужен для копирования компонентов, созданных не в js
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );      //нужен для создания файла CSS для каждого файла JS, который содержит CSS
const MediaQueryPlugin = require( 'media-query-plugin' );

const { ASSETS_PATH } = require( './constants/paths/index.js' );

const config = {
    entry: './index.js',
    output: {                                                           //output у prod и dev один
        filename: 'main.js',
        path: path.resolve( __dirname, '../build' ),                    //путь к дерриктории, в которой будут создаваться/билдится файлы
    },
    context: path.resolve( __dirname, '../src' ),                       //путь к дерриктории, в которой содержится родной/базовый файл

    plugins: [
        new CopyWebpackPlugin( [                                        //копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки (в build)
            {
                from: '../src/assets/images', to: '../build/assets/images',
            },
            {
                from: '../src/assets/icons', to: '../build/assets/icons',
            },
            // {
            //     from: '../src/assets/fonts', to: '../build/assets/fonts',
            // },
            {
                from: '../src/data', to: '../build/data',
            },
        ] ),
        new MiniCssExtractPlugin(
        //{filename: 'assets/css/style.css'}                            //для того чтобы style.css в build создавался в assets/css (но плохо работает)
        ),

        new HtmlWebpackPlugin( {
            template: 'index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1',
            }
        } )
    ],

    module: {
        rules: [                                                       //правила и настройки вєбпаку для обработки файлов
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
                            hmr: process.env.NODE_ENV === 'development'
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
                            outputPath: 'assets/images',                //путь, где будет создаваться файл, относительно path в стр. 13
                            publicPath: 'assets/images',                //указывается путь на созданный файл, с помощью которого на него мугут ссылаться другие файлы
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
                            outputPath: 'assets/fonts',                 //путь, где будет создаваться файл, относительно path в стр. 13
                            publicPath: 'assets/fonts',                 //указывается путь на созданный файл, с помощью которого на него мугут ссылаться другие файлы
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;