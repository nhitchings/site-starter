'use strict';

var gulp = require('gulp'),
useref = require('gulp-useref'),
gulpif = require('gulp-if'),
uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
imagemin = require('gulp-imagemin'),
cachebust = require('gulp-cache-bust');
 
gulp.task('html', function () {
    return gulp.src('public/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
    return gulp.src('public/**/*.css')
      .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(gulp.dest('dist'));
});

// gulp.task('templates', function () {
//     return gulp.src('public/app/views/**/*.html')
//         .pipe(templateCache({standalone: true}))
//         .pipe(gulp.dest('public/app/templates'));
// });

// gulp.task('watchtemplates',['templates'], function(){
//   gulp.watch('public/app/views/**/*.html', ['templates']); 
//   // Other watchers
// })

// gulp.task('build', function(){
//   return gulp.src('public/*.html')
//     .pipe(useref())
//     // Minifies only if it's a JavaScript file
//     .pipe(gulpIf('*.js', uglify()))
//     .pipe(gulp.dest('dist/js'))
//     // Minifies only if it's a CSS file
//     .pipe(gulpIf('*.css', cssnano()))
//     .pipe(gulp.dest('dist'))
// });

gulp.task('compress', function () {
    return gulp.src('public/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
  return gulp.src('public/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

gulp.task('bust', function(){
  return gulp.src('dist/**/*.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./dist'));
});
 
// Default task that will run by type 'gulp'
gulp.task('default',['html', 'compress', 'minify-css', 'bust']);
