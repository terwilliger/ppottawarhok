var gulp = require('gulp');
var sass = require('gulp-sass');

var rename = require('gulp-rename');


var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('sass', function () {
    gulp.src('styles/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('../build/css'));

        

});





gulp.task("js", function () {
    gulp.src('scripts/**/*')
        .pipe(gulp.dest('../build/js'));
 
});


gulp.task("img", function () {
    gulp.src('img/**/*')
        .pipe(gulp.dest('../build/img'));
});


gulp.task("layout", function () {


         gulp.src('layout/**/*')
        .pipe(nunjucksRender({
            path: ['layout/']
        }))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('../build'));
        
 
});



gulp.task('default', ['sass',  'js', 'img', 'layout'], function () {
    gulp.watch('styles/**/*.scss', ['sass']);
  gulp.watch('scripts/**/*.js', ['js']);
  gulp.watch('scripts/**/*', ['img']);
    gulp.watch('layout/**/*.njk', ['layout']);
  
})