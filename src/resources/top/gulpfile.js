/*--------------------------------------------------------
  modules
--------------------------------------------------------*/
'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cached = require('gulp-cached'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  encode = require('gulp-convert-encoding'),
  uglify = require('gulp-uglify'),
  pleeease = require('gulp-pleeease'),
  replace = require('gulp-replace');
//------------------------------------------------------------------------------
// PC:sass / scss / css
//------------------------------------------------------------------------------

gulp.task('pc:sass', function () {
  return gulp.src(
    __dirname + '/scss/pc/**/*.scss'
  )
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    /*
    .pipe(cached('sass'))
    */
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    /*
    .pipe(pleeease({
      minifier: true
    }))
    */
    .pipe(
      autoprefixer({
        browsers: [
          'last 2 versions',
          'ie >= 9',
          'ChromeAndroid >= 4',
          'Android >= 4',
          'iOS >= 9'
        ],
      })
    )
    .pipe(replace('UTF-8', 'Shift_JIS'))
    .pipe(replace('utf-8', 'Shift_JIS'))
    .pipe(encode({to: 'Shift_JIS'}))
    .pipe(
      gulp.dest(__dirname + '/../../webroot/top/css')
    );
});

//------------------------------------------------------------------------------
// SP:sass / scss / css
//------------------------------------------------------------------------------

gulp.task('sp:sass', function () {
  return gulp.src(
    __dirname + '/scss/spn/**/*.scss'
  )
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    /*
    .pipe(cached('sass'))
    */
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    // .pipe(pleeease({
    //     minifier: true
    // }))
    .pipe(
      autoprefixer({
        browsers: [
          'last 2 versions',
          'ie >= 9',
          'ChromeAndroid >= 6',
          'Android >= 6',
          'iOS >= 9'
        ],
      })
    )
    .pipe(replace('UTF-8', 'Shift_JIS'))
    .pipe(replace('utf-8', 'Shift_JIS'))
    .pipe(encode({to: 'Shift_JIS'}))
    .pipe(
      gulp.dest(__dirname + '/../../webroot/spn/top/css')
    );
});


//------------------------------------------------------------------------------
// PC:watch
//------------------------------------------------------------------------------

gulp.task('pc:watch', function () {
  watch(__dirname + '/scss/pc/**/*.scss', function () {
    return gulp.start('pc:sass');
  });
});
//------------------------------------------------------------------------------
// SP:watch
//------------------------------------------------------------------------------
gulp.task('sp:watch', function () {
  watch(__dirname + '/scss/spn/**/*.scss', function () {
    return gulp.start('sp:sass');
  });
});

//pc:watch
gulp.task('pc', ['pc:watch']);

//sp:watch
gulp.task('sp', ['sp:watch']);


// gulp.task('default', ['sp']);
gulp.task('default', ['pc', 'sp']);
