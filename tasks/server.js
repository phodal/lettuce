var connect = require('gulp-connect');
var path = require('path');

module.exports = function () {

  var gulp = this;

  if (gulp.isWatching) {
    connect.server({
      root: [
          path.resolve('./')
      ],
      port: 5678
    });
  }
};

