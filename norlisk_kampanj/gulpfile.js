var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');


// gulp-sass
gulp.task('sass', function () {
    return gulp
        .src('app/sass/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// browser-sync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

// Gulp watch!
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']); // SASS-Watch
    gulp.watch('app/*.html', browserSync.reload); // HTML-Watch
    gulp.watch('app/src/**/*.js', browserSync.reload); // JS-Watch
});

// For the distributed version of the homepage, that is live.
gulp.task('useref', function(){
    return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify())) // Minimizes JS-Code
      .pipe(gulpIf('*.css', cssnano()))  // Minimizes CSS-code    
      .pipe(gulp.dest('dist')) // Save to dist-folder
  });

// For optimizing images
  gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/images'))
  });