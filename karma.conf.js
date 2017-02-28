// Karma configuration
// Generated on Tue Feb 28 2017 14:14:36 GMT-0600 (CST)

module.exports = function (config) {
    config.set({

        basePath: '',
        frameworks: ['mocha'],
        files: [
            '',
            '**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    });
};
