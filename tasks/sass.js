var gutil = require('gulp-util');
var path = require('path');
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var taskName = path.basename(__filename, path.extname(__filename));

var defaultConfig = {
  'entry': [
    '<%= baseSrc %>demo/assets/sass/*.scss'
  ],
  'src': [
    '<%= baseSrc %>demo/assets/sass/{,**/}*.scss'
  ],
  'dest': '<%= baseSrc %>demo/assets/css',
  'options': {
    errLogToConsole: true,
    includePaths: [
    ]
  }
};

module.exports = function () {

  var gulp = this;
  var conf = this.taskConfig(taskName, defaultConfig);

  function bundle() {
    return gulp.src(conf.src)
      .pipe(newer(conf.dest))
      .pipe(sass(conf.options))
      .pipe(prefix(['> 1%', 'last 2 version', 'ie 8', 'Firefox ESR', 'Opera 12.1'], { cascade: true }))
      .pipe(gulp.dest(conf.dest))
      .pipe(gulp.pipeTimer(taskName))
  }

  gulp.watcher([].concat(conf.src), function (evt) {
    gutil.log(evt.path, evt.type);
    bundle();
  });

  return bundle();
};
