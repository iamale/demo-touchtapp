var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    spawn = require('child_process').spawn;

var Spawner = function() {
  var args = Array.prototype.slice.call(arguments);
  return function() {
    spawn(args[0], args.slice(1),
      { stdio: 'inherit' });
  };
};

var Copier = function(src, dest) {
  return function() {
    return gulp.src(src).pipe(gulp.dest(dest));
  };
};

var Seq = function() {
  var args = Array.prototype.slice.call(arguments);
  return function(cb) {
    runSequence.apply(this, args.concat([cb]));
  };
};

gulp.task('jsx', function() {
  return gulp.src('src/js/main.jsx')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.jsx']
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('copy:index', Copier('src/index.html', 'www/'));
gulp.task('copy', ['copy:index']);

gulp.task('dist', ['jsx', 'copy:index']);


// Cordova tasks

gulp.task('cordova:android', Spawner("cordova", "build", "android"));
gulp.task('cordova', ['cordova:android']);

gulp.task('run:android', Spawner("cordova", "run", "android"));
gulp.task('run', ['run:android']);


gulp.task('build', Seq('dist', 'cordova:android'));
gulp.task('build-run', Seq('build', 'run'));