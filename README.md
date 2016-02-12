# Laravel Elixir SVG Symbols

Extension to Laravel Elixir that uses `gulp-svg-sprite` to generate a sprite file out of individual SVG files. Consider it the image spriting technique but for SVGs. It's **highly recommended** to read these awesome articles to learn  all about this technique:

* [Icon System with SVG Sprites](http://css-tricks.com/svg-sprites-use-better-icon-fonts/)
* [SVG `symbol` a Good Choice for Icons](http://css-tricks.com/svg-symbol-good-choice-icons/)
* [SVG `use` with External Reference](https://css-tricks.com/svg-use-with-external-reference-take-2/)
* [SVG for Everybody](https://github.com/jonathantneal/svg4everybody)

## Install

```
npm install laravel-elixir-svg-symbols --save
```

## Use

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-svg-symbols');

elixir(function(mix) {
    mix.svgSprite();
});
```

Yes, it's that simple. This will use the extension's default options, which are to find `.svg` files inside an `svg` directory in your assets directory (either Laravel's default or your own defined in `elixir.json`). It will output a sprite file named as `sprite.svg` to `public/svg` which can then be included in your project's markup.

```html
    <svg class="icon">
        <use xlink:href="/svg/sprite.svg#icon-example"></use>
    </svg>
```

## Configure

You can override the extension's settings by passing the following optional parameters like:

```javascript
    mix.svgSprite(src, output, pluginOptions)
```

### src

Path to the directory that holds the individual SVGs. Set as `null` if default is fine.

### output

Path to the directory that will hold the generated spritesheet file. Set as `null` if default is fine.

### pluginOptions

Options passed along directly to [gulp-svg-sprite](https://github.com/jkphl/gulp-svg-sprite). Read the README for more info on these.

## Example

This example sets custom source and output directories, and changes the generated file name to `symbols.svg`.

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-svg-symbols');

elixir(function(mix) {
    mix.svgSymbols('my/assets/directory/', 'my/output/directory/', {
        mode: {
            symbol: {
                dest: '.',
                sprite: 'symbols.svg'
            }
        }
    });
});
```

For more complex examples and all the `svg-sprite` documentation, [check out its repo](https://github.com/jkphl/svg-sprite).

## All credit goes to

* [Chris Coyer](http://chriscoyier.net/) for blowing my mind with the [SVG sprite technique and SVG symbols](http://css-tricks.com/svg-symbol-good-choice-icons/).
* [Joschi Kuphal](http://jkphl.is) for his awesome [svg-sprite](https://github.com/jkphl/svg-sprite) utility and the [gulp-svg-sprite](https://github.com/jkphl/gulp-svg-sprite) wrapper.
* All contributors to the [Laravel Elixir](https://github.com/laravel/elixir) project and the [Laravel](http://laravel.com/) PHP framework.
