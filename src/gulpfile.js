var gulp = require('gulp');
var sass = require('gulp-sass');

var rename = require('gulp-rename');
var njk = require('gulp-render-nunjucks');



gulp.task('sass', function () {
    gulp.src('styles/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('../build/css'));

        

});





gulp.task("js", function () {
    gulp.src('scripts/**/*')
        .pipe(gulp.dest('../build/js'));
 
});


gulp.task("layout", function () {


         gulp.src('layout/**/*')
        .pipe(njk.render())
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('../build'));
        
 
});



gulp.task('default', ['sass',  'js', 'layout'], function () {
    gulp.watch('styles/**/*.scss', ['sass']);
  gulp.watch('scripts/**/*.js', ['js']);
    gulp.watch('layout/**/*.njk', ['layout']);
  
})