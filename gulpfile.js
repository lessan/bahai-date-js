var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  code: './bahaidate.js',
  tests: './test.js',
  coverage: './coverage'
}

var TIMEOUT = 30000;

var messages = {
  runningTests: '<span style="color: white">Running Tests</span>'
};

function handleError(err) {
  browserSync.notify(err.toString(), TIMEOUT);
  this.emit('end');
}

/**
 * Watch for changes to the files
 */
gulp.task('watch-for-changes', function() {
  gulp.watch([paths.code, paths.tests], ['tests']);
});

/**
 * Run tests using mocha and coverage using istanbul
 */
gulp.task('tests', function (callback) {
  browserSync.notify(messages.runningTests, TIMEOUT);
  // load source code
  gulp.src(paths.code)
      .pipe(istanbul({ includeUntested: true }))
      .pipe(istanbul.hookRequire())
      .on('finish', function() {
        // load tests
        gulp.src([paths.tests], { read: false })
            // run through mocha
            .pipe(
              mocha({reporter: 'spec'})
                // handle failed tests
                .on('error', handleError)
            )
            // generate reports
            .pipe(istanbul.writeReports({
              dir: paths.coverage,
              reportOpts: { dir: paths.coverage },
              reporters: ['html', 'text-summary']
            }))
            // reload the browser when done
            .on('end', reload)
            // return when done
            .on('end', callback);
      });
});

/**
 * Wait for the tests (the first time), then launch the coverage server
 */
gulp.task('coverage-server', ['tests'], function() {
  browserSync({
    server: {
      baseDir: paths.coverage
    }
  });
});


/**
 * Default task, running just 'gulp' will:
 *  - watch for changes to the files
 *  - run tests and generate code coverage
 *  - launch coverage server
*/
gulp.task('default', ['watch-for-changes', 'coverage-server']);

