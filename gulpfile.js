var gulp = require('gulp');
require('./tasks/libs/watcher').call(gulp, null);

gulp.task('clean', require('./tasks/clean'));
gulp.task('mirror', require('./tasks/mirror'));
gulp.task('sass', require('./tasks/sass'));
gulp.task('build', require('./tasks/build'));
gulp.task('server', require('./tasks/server'));

gulp.task('dev', function () {
  gulp.setWatcher();
  gulp.start('build');
});

gulp.opts = {
  'dest': {
    "buildQueue": [
//      'clean',
//      'mirror',
      'sass',
      'server'
    ]
  }
};


require('./tasks/libs/config-fix').call(gulp, null);
