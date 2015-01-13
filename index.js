var gulp          = require('gulp'),
    rename        = require('gulp-rename'),
    svgSymbols    = require('gulp-svg-symbols'),
    elixir        = require('laravel-elixir'),
    notifications = require('laravel-elixir/commands/Notification'),
    utilities     = require('laravel-elixir/commands/Utilities'),
    _             = require('underscore')
;

elixir.extend('svgSymbols', function(options) {
    var config = this,
        defaultOptions = {
            outputDir: 'public/svg',
            rename: 'svg-symbols',
            srcDir: config.assetsDir + 'svg'
        }
    ;

    options = _.extend(defaultOptions, options);

    gulp.task('svgSymbols', function() {

        var onError = function(e) {
            new notifications().error(e, 'SVG symbols sprite sheet creation failed');
            this.emit('end');
        };

        return gulp.src(options.srcDir + '/**/*.svg')
            .pipe(svgSymbols(options))
            .on('error', onError)
            .pipe(rename({ basename: options.rename }))
            .pipe(gulp.dest(options.outputDir))
            .pipe(new notifications().message('SVG symbols sprite sheet created on ' + options.outputDir));

    });

    this.registerWatcher('svgSymbols', options.srcDir + '/**/*.svg');

    return this.queueTask('svgSymbols');
});
