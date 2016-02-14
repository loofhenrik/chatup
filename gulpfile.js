var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');

gulp.task("test", function(){
    console.log("TESTAR");
})

gulp.task('clean', function(){
	return gulp.src('build', {read:false})
	.pipe(clean());
});

gulp.task('concat', function(){
	return gulp.src('app/scripts/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('build/scripts/*.js'))
	.pipe(minify())
	.pipe(rename('main.min.js')) 
	.pipe(gulp.dest('build/scripts'))
});

gulp.task('minify', function(){
	return gulp.src('app/javascript/*.js')
	.pipe(concat('main.js'))
	.pipe(minify())
	.pipe(gulp.dest('build/scripts/'))
});