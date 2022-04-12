const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/index.js', 'public/js')
    .react()
    // .sass('resources/sass/index.scss', 'public/css');
    .webpackConfig({
        module: {
            rules: [{
                test: /\.less$/,
                use: [
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                modifyVars: { '@primary-color': '#307839' },
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            }]
        }
    })
