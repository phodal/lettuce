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
                        lines: 75,
                        statements: 75,
                        //branches: 75,
                        functions: 70
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
                    'src/promise.js',
                    'src/class.js',
                    'src/ajax.js',
                    'src/event.js',
                    'src/template.js',
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('test', ['jshint', 'connect', 'jasmine']);
    grunt.registerTask('default', ['concat', 'jshint', 'connect', 'jasmine', 'uglify']);

};
