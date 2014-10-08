module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery-ui/ui/jquery-ui.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                ],
                dest: 'static/js/requirements.dist.js'
            },
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                ],
                dest: 'static/css/style.external.dist.css'
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.min.map'], dest: 'static/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['static-src-build/css/style.css'], dest: 'static/css/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['static-src/images/*'], dest: 'static/images/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['static-src/templates/*'], dest: 'static/templates/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['static-src/js/scripts/*.js'], dest: 'static/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['static-src/js/scripts/*.txt'], dest: 'static/js/', filter: 'isFile'},
                ]
            }
        },

        watch: {
            dev: {
                files: [
                    "static-src/sass/*",
                    "static-src/js/*",
                ],
                tasks: ['default']
            }
        },

        sass: {
            dist: {
                files: {
                    "static-src-build/css/style.css": 'static-src/sass/style.scss',
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['sass', 'concat', 'copy']);
    grunt.registerTask('dev', ['default', 'watch']);

};
