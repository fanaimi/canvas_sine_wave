module.exports = function(grunt){

    // Project configuration.
    grunt.initConfig({
        uglify: {
            my_scripts: {
                files: {
                    'build/js/output.min.js': ['dev/js/main.js']
                }
            }
        },
        sass : {
            dist : {
                options : {
                    style : "compressed"
                },
                files : {
                    //destination : source
                    'build/css/main.css' : 'dev/scss/main.scss'
                }
            }

        },

        watch: {
            js: {
                files: ['dev/js/*.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['dev/scss/main.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['uglify', 'sass',  'watch']);

};