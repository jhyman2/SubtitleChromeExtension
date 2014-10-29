// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: '../../../static',
    paths: {
        app: 'js/app.js',
        backbone: 'js/requirements.dist'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['../js/content_script.js'], function(app) {
    var newApp = new app();
});

