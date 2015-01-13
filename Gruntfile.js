module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },

        jasmine : {
            src : 'dist/lettuce.js',
            options : {
                host: "http://0.0.0.0:8000",
                vendor: ['node_modules/jasmine-ajax/lib/mock-ajax.js'],
                specs : 'specs/*-spec.js',
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'coverage/coverage.json',
                    report: {
                        type: 'lcov',
                        options: {
                            dir: 'coverage'
                        }
                    },
                    thresholds: {
                        lines: 85,
                        statements: 85,
                        branches: 70,
                        functions: 85
                    }
                }
            }
        },
        concat: {
            options: {
                separator: "\n\n"
            },
            dist: {
                src: [
                    'src/_intro.js',
                    'src/main.js',
                    'src/helpers.js',
                    'src/class.js',
                    'src/ajax.js',
                    'src/event.js',
                    'src/template.js',
                    'src/simpleview.js',
                    'src/router.js',
                    'src/_outro.js'
                ],
                dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        jshint: {
            files: ['dist/lettuce.js'],
            options: {
                globals: {
                    console: true,
                    module: true,
                    document: true
                },
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['concat', 'jshint', 'qunit']
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['dist/lettuce.js', 'dist/lettuce.min.js'],
                        dest: 'dist/'
                    }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('test', ['replace', 'jshint', 'connect', 'jasmine']);
    grunt.registerTask('default', ['replace', 'concat', 'jshint', 'connect', 'jasmine', 'uglify']);

};
