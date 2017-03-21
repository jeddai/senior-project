module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha', 'chai', 'sinon'],
        files: [
            'public/bower/angular/angular.js',
            'public/bower/angular-mocks/angular-mocks.js',
            'public/bower/angular-cookies/angular-cookies.js',
            'public/bower/angular-touch/angular-touch.js',
            'public/bower/angular-animate/angular-animate.js',
            'public/bower/angular-ui-router/release/angular-ui-router.min.js',
            'public/bower/angular-bootstrap/ui-bootstrap-tpls.js',
            'public/javascripts/titanic.js',
            'public/javascripts/components/home-controller.js',
            'public/javascripts/components/form-controller.js',
            'public/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            'public/**/*.spec.js': ['browserify']
        },
        reporters: ['progress', 'spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
};
