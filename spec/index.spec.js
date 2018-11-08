/*!
 * Module dependencies.
 */

var fs = require('fs-extra'),
    npm = require('npm'),
    path = require('path'),
    outputPath = path.join(__dirname, '../out');

/**
 * Configure Jasmine.
 */

jasmine.getEnv().defaultTimeoutInterval = (1000 * 60) * 2;

/**
 * Specification.
 *
 * There are no tests at the moment.
 */

describe('phonegap-docs', function() {
    beforeEach(function(done) {
        fs.remove(outputPath, done);
    });

    afterEach(function(done) {
        fs.remove(outputPath, done);
    });

    it('should compile in less than 1 minute', function(done) {
        var projectPath = path.join(__dirname, '..'),
            packagePath = path.join(projectPath, 'package.json'),
            packageContent = JSON.parse(fs.readFileSync(packagePath), 'utf8');
        let packageConfig = require('../package.json');
        console.log('packageConfig = ' + packageConfig);
        // build docs
        npm.load(packageConfig, function(e, npm) {
            npm.commands['run-script'](['build-prod'], function(e) {
                expect(e).toEqual(null);
                done();
            });
        });
    });
});
