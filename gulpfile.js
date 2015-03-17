var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var del = require('del');

//clean old files
gulp.task('clean', function(cb) {
	del('./dist/*.js', cb);
});

//Merge JS files
gulp.task('concat', function() {
	gulp.src([
		'./src/adapter-dist-trad/_intro.js',
		'./src/adapter-dist-trad/var.js',
		'./src/adapter-dist-trad/_defense.js',
		'./src/core.js',
		'./src/str-backup.js',
		'./src/str.js',
		'./src/root.js',
		'./src/ua.js',
		'./src/url.js',
		'./src/dom.js',
		'./src/adapter-mod-action/_intro.js',
		'./bower_components/action/src/action.js',
		'./src/adapter-mod-action/_outro.js',
		'./src/adapter-mod-template/_intro.js',
		'./bower_components/underscore-template/src/underscore-template.js',
		'./src/adapter-mod-template/config.js',
		'./src/adapter-mod-template/_outro.js',
		'./src/adapter-dist-trad/_outro.js'
	])
		.pipe(concat('underscore-ext.js'))
		.pipe(gulp.dest('./dist/'));
});

//Compress the Js file
gulp.task('uglify', function() {
	gulp.src('./dist/underscore-ext.js')
		.pipe(uglify('underscore-ext.min.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['clean','concat','uglify']);