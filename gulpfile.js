/*eslint-env node */
const gulp = require('gulp');
const sass = require('gulp-sass'); //npm install gulp-sass
const autoprefixer = require('gulp-autoprefixer') //npm install --save-dev gulp-autoprefixer
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', ['styles', 'watch'], function () {
  browserSync.init({ injectChanges: true, server: './' });
});

gulp.task('styles', function () { //converts scss to css
  gulp.src('resources/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError)) //log the error if error.
    .pipe(autoprefixer({
      browsers: ['last 2 versions'] //tells the browsers what versions to use. (webkit stuff.)
    }))
    .pipe(gulp.dest('resources/css')) //destination to save
    .pipe(reload({ stream: true }))
})

gulp.task('watch', function () {
  gulp.watch('resources/sass/**/*.scss', ['styles']);
  gulp.watch("resources/js/**/*.js").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);

});