var gulp      = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var Elixir    = require('laravel-elixir');

var config    = Elixir.config;

/*
 |----------------------------------------------------------------
 | SVG Sprites Task
 |----------------------------------------------------------------
 |
 | This custom task grabs individual SVG files and generates an 
 | optimized SVG sprite file using `svg-sprite`.
 |
 */

Elixir.extend('svgSprite', function(src, output, options) {
    config.svgSprite = {
        folder: 'svg',
        outputFolder: 'svg',
        pluginOptions: {
            mode: {
                symbol: {
                    dest: '.',
                    sprite: 'sprite.svg'
                }
            }
        }
    };

    new Elixir.Task('svgSprite', function() {
        var paths = new Elixir.GulpPaths()
            .src('**/*.svg', src || config.get('assets.svgSprite.folder'))
            .output(output || config.get('public.svgSprite.outputFolder'));

        // Fancy paths log
        this.log(paths.src, paths.output);

        // Error handler
        var errorHandler = function(e) {
            new Elixir.Notification().error(e, 'SVG sprite failed');
            this.emit('end');
        };

        return gulp.src(paths.src.path)
            .pipe(svgSprite(options || config.svgSprite.pluginOptions))
            .on('error', errorHandler)
            .pipe(gulp.dest(paths.output.path))
            .pipe(new Elixir.Notification('SVG sprite generated'))
    })
    .watch(config.get('assets.svgSprite.folder') + '/**/*.svg');
});
