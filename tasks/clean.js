var path = require('path');
var del = require('del');
var gutil = require('gulp-util');

module.exports = function (cb) {
  var gulp = this;
    console.log(gulp.opts);

  gutil.log('Dest', gutil.colors.magenta(path.join(process.cwd(), gulp.opts.baseDest)), 'removed.');
  del([gulp.opts.baseDest], cb);
};

