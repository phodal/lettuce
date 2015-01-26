var through = require('through');
var gutil = require('gulp-util');

module.exports = function () {
  var gulp = this;

  this.isWatching = false;

  this.setWatcher = function () {
    this.isWatching = true;
  };

  this.watcher = function () {
    if (this.isWatching) {
      return gulp.watch.apply(gulp, arguments);
    }
    return null;
  };

  this.pipeTimer = function (taskname) {
    taskname = taskname || '~~~';
    var startTime = new Date();

    return through(
      function () {
      },
      function () {
        if (gulp.isWatching) {
          this.on('end', function () {
            var time = new Date() - startTime;
            gutil.log('Watcher:',
              '\'' + gutil.colors.cyan(taskname) + '\'',
              're-bundle after',
              gutil.colors.magenta(time > 1000 ? time / 1000 + ' s' : time + ' ms'));
          });
        }
        this.queue(null);
      });
  }

  // --watch for enable
  if (gutil.env.watch) {
    this.setWatcher();
  }

};
