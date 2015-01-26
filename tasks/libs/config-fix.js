var _ = require('lodash');
var gutil = require('gulp-util');

module.exports = function () {

    var opts = {
        "destRoot": '.',
        'dist': {},
        'build': {},
        'default': {}
    };

    opts = _.merge(opts, this.opts);

    opts.destination = {
        "dest": "<%= destRoot %>/dest",
        "build": "<%= destRoot %>/build"
    };

    // --dev=:devType
    var envInputDevType = gutil.env.dev || gutil.env.d;
    var devType = _.has(opts.destination, envInputDevType) ? envInputDevType : _.keys(opts.destination)[0];

    opts.baseSrc = '';
    opts.baseDest = [opts.destination[devType]].join('/');

    opts.devTarget = _.merge({
            buildQueue: [],
            tasks: {}
        },
        opts[devType][opts.default[devType]] || opts[devType]
    );

    opts = render(opts, opts);

    this.opts = opts;

    this.taskConfig = function (taskName, defaultConfig) {
        return render(_.merge(defaultConfig, opts.devTarget.tasks[taskName]), opts);
    }
};

function render(target, data) {
    return JSON.parse(_.template(JSON.stringify(target), data));
}
