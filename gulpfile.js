/* global __dirname */
/* global Buffer */
var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var requirejs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var karma = require('karma');
var http = require('gulp-connect');
var es = require('event-stream');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');

var paths = {
	src: 'src',
	build: 'build',
	bower: 'bower_components'
};

function appendLine(text) {
	return es.through(function (file) {
		if (file.isNull()) return this.emit('data', file);
		if (file.isStream()) return this.emit('error', new Error("gulp-insert-lines: Streaming not supported"));

		var str = file.contents.toString('utf8') + '\n' + text;

		file.contents = new Buffer(str);
		this.emit('data', file);
	});
}

gulp.task('clean', function () {
	return gulp.src(paths.build, { read: false })
		.pipe(clean({ force: true }))//clean build folder
		.on('error', gutil.log)
		;
});

gulp.task('transpile', function () {
    return gulp.src([paths.src + '/**/*.js'])
		.pipe(babel({
			modules: "amd"
		}))
		.pipe(ngAnnotate())
		.pipe(gulp.dest(paths.build));
});

gulp.task('copy-assets', function () {
	return gulp.src([
		paths.src + '/**/*.html',
		paths.src + '/**/*.css',
		paths.src + '/**/*.png'
	])
		.pipe(gulp.dest(paths.build));
})

gulp.task('copy-libs', function () {
	return gulp.src([
		paths.bower + "/**/*.js",
		paths.bower + '/**/*.css',

		paths.bower + '/**/*.eot',
		paths.bower + '/**/*.svg',
		paths.bower + '/**/*.ttf',
		paths.bower + '/**/*.woff',
		paths.bower + '/**/*.woff2'
	])
		.pipe(gulp.dest(paths.build + '/bower_components'));
});

gulp.task('build-src', function (done) {
    return requirejs({
		name: "main",
		baseUrl: paths.build,
		out: 'build.js'
	})
		.pipe(appendLine("$(function(){ require(['main']); });"))
		.pipe(jshint())		
		.pipe(jshint.reporter('default'))
	//.pipe(uglify())
		.pipe(gulp.dest(paths.build));
});

gulp.task('build-unit-test', function (done) {
    return requirejs({
		name: "main.spec",
		baseUrl: paths.build,
		out: 'build.spec.js'
	})
		.pipe(appendLine("require(['main.spec']);"))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest(paths.build));
});

gulp.task('build', ['transpile', 'copy-assets', 'copy-libs'], function () {
	gulp.start(['build-src', 'build-unit-test']);
});

gulp.task('rebuild', ['clean'], function (done) {
	gulp.start(['build']);
	done();
});

gulp.task('karma-test', function (done) {
	new karma.Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('watch', function () {
    return gulp.watch([paths.src + '/**/*'], ['build']);
});

gulp.task('http', function () {
	http.server({
		root: 'build',
		livereload: true
	});
});

gulp.task('default', ['rebuild'], function () {
	gulp.start(['watch', 'http']);
});