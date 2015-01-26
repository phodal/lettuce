var path = require('path');
var gutil = require('gulp-util');
var del = require('del');
var newer = require('gulp-newer');
var _ = require('lodash');
var taskName = path.basename(__filename, path.extname(__filename));

var defaultConfig = {
  'src': [
    '<%= baseSrc %>src/client/content/mirror/{,**/}*.*',
    '<%= baseSrc %>src/client/index.html'
  ],
  'dest': '<%= baseDest %>'
};

module.exports = function () {

  var gulp = this;
  var conf = this.taskConfig(taskName, defaultConfig);

  function bundle() {
    return gulp.src(conf.src)
      .pipe(newer(conf.dest))
      .pipe(gulp.dest(conf.dest))
      .pipe(gulp.pipeTimer(taskName));
  }

  gulp.watcher(conf.src, function (evt) {
    console.log(evt);
    var relativePath = path.relative(gulp.opts.baseSrc, evt.path);
    gutil.log(relativePath, evt.type);

    if (evt.type == 'deleted') {
      var destFile = path.join(gulp.opts.baseDest, relativePath);
      del([destFile], function () {
        gutil.log(destFile, evt.type)
      });
    } else {
      bundle();
    }
  });

  return bundle();
};
