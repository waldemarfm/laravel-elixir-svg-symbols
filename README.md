# Laravel Elixir SVG Symbols

Extension to Laravel Elixir that generates an SVG sprite sheet defining a symbol for each SVG file in a defined directory. This symbols file has to be included inline on your app markup to be used. It's **highly recommended** to read these awesome articles to learn about all about this technique:

* [Icon System with SVG Sprites](http://css-tricks.com/svg-sprites-use-better-icon-fonts/)
* [SVG `symbol` a Good Choice for Icons](http://css-tricks.com/svg-symbol-good-choice-icons/)

## Install

```
npm install laravel-elixir-svg-symbols --save-dev
```

## Use

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-svg-symbols');

elixir(function(mix) {
    mix.svgSymbols();
});
```

Yes, it's that simple. This will use the extension's default options, which are to find .svg files inside an `svg` directory in your assets folder (either Laravel 5's default or your own defined in `elixir.json`). It will output the spritesheet files `svg-symbols.svg` and `svg-symbols.css` to `public/svg` which can then be included in your main layout file, right after `<body>`.

```php
    <link rel="stylesheet" src="{{ asset('svg/svg-symbols.css') }}">
</head>
<body>
    @if(file_exists(public_path() . '/svg/svg-symbols.svg'))
        <?php include(public_path() . '/svg/svg-symbols.svg'); ?>
    @endif

    ...
```

You can then use the symbols freely in your app:

```html
    <svg class="styling-class">
        <use xlink:href="#symbol-id"></use>
    </svg>
```

## Configure

Of course you can override the extension's settings by passing the following parameters:

### srcDir

The path to the directory that holds the original separate SVG files.

### outputDir

Path to the directory that will hold the generated spritesheet file.

### rename

By default the generated files are called `svg-symbols.svg` and `svg-symbols.css`. Change this to change the name of the files. Don't include any extensions as this will only change the file basenames.

---

The rest are options that are passed along to [gulp-svg-symbols](https://github.com/Hiswe/gulp-svg-symbols) to override the defaults. Read the README for more info on those.

## Example

This example sets custom source and output directories, renames the generated files to a shorter `symbol.svg` and skips generating a CSS file by overriding `gulp-svg-symbols` default templates option.

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-svg-symbols');

elixir(function(mix) {
    mix.svgSymbols({
        srcDir: 'our/assets/directory/',
        outputDir: 'output/directory/',
        rename: 'symbols',
        templates: ['default-svg']
    });
});
```

## All credit goes to

* [Chris Coyer](http://chriscoyier.net/) for blowing my mind with the [SVG sprite technique and SVG symbols](http://css-tricks.com/svg-symbol-good-choice-icons/).
* [Hiswe](http://www.hiswe.net/) for his stable [gulp-svg-symbols](https://github.com/Hiswe/gulp-svg-symbols) Gulp plugin.
* All contributors to the [Laravel Elixir](https://github.com/laravel/elixir) project and the [Laravel](http://laravel.com/) PHP framework.
