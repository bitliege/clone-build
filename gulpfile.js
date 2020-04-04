// =============================================================================

  // Clone, Jekyll, and Netlify Boilerplate
  // Authored by Josh Beveridge

// =============================================================================

"use strict";

// Requirements
const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Tasks
    // Browser Sync
    function browserSync(done) {
        browsersync.init({
            server: {
                baseDir: "_site"
            },
        });
        done();
    };
    // BrowserSync Reload
    function browserSyncReload(done) {
        return src('_site/*.html')
        .pipe(browsersync.reload({
            stream: true
        }));
    }
    // Clone JS
    function moveCloneJS() {
        return src('node_modules/clone-framework/dist/js/clone.min.js')
        .pipe(dest('assets/js'));
    }
    // Sass
    function compile() {
        return src('assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(postcss([cssnano()]))
        .pipe(dest('assets/css'));
    }
    // Watch
    function watchFiles() {
        watch('assets/scss/**/*.scss', series(compile, browserSyncReload));
        watch('assets/js/**/*.js', series(compile, browserSyncReload));
        watch('assets/img/**/*.js', series(compile, browserSyncReload));
    }

// Exports
    exports.watch = series(moveCloneJS, compile, parallel(browserSync, watchFiles));
    exports.default = series(moveCloneJS, compile, parallel(browserSync, watchFiles));