/**
 * Created by Edwin Gamboa on 16/05/2017.
 */
/* globals describe,beforeEach,it,afterEach, before, expect */
(function () {
  // function (manifestConverter, manifest831, convertedManifest910) {
  'use strict';
  var grunt;
  var fs;
  var path;
  var testRootPath;
  var manifestPath;
  var fixedManifestPath;
  var testPath;
  var initialVersion;
  var defaultReleaseVersion;
  var defaultNextVersion;
  var stdin;
  before(function () {
    initialVersion = '0.1.0-SNAPSHOT';
    defaultReleaseVersion = '0.1.0';
    defaultNextVersion = '0.2.0-SNAPSHOT';
  });
  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
    var webpackageName = 'my-package';
    path = require('path');
    fs = require('fs-extra');
    testRootPath = path.join(process.cwd(), 'test');
    testPath = path.resolve(testRootPath, 'webpackages', webpackageName);
    manifestPath = path.resolve(testPath, 'manifest.webpackage');
    fixedManifestPath = path.resolve(testPath, 'fixed_manifest.webpackage');

    grunt = require('grunt');
    grunt.task.init = function () {};

    var taskPath = path.resolve(process.cwd(), 'tasks');
    grunt.task.loadTasks(taskPath);
  });
  afterEach(function () {
    var manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.version = initialVersion;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

    var fixedManifest = JSON.parse(fs.readFileSync(fixedManifestPath, 'utf8'));
    fixedManifest.version = defaultReleaseVersion;
    fs.writeFileSync(fixedManifestPath, JSON.stringify(fixedManifest, null, 2), 'utf8');
  });
  describe('run grunt task "_webpackage-prepareRelease", webpackage path configured in param.src', function () {
    var releaseVersion;
    beforeEach(function () {
      // Init config
      grunt.initConfig({
        param: {
          src: testPath
        }
      });
      releaseVersion = '1.2.3';
    });
    afterEach(function () {
      grunt.initConfig({});
    });
    it('should throw error since provided nextVersion is invalid', function (done) {
      process.nextTick(function () { stdin.send(defaultNextVersion + '\n'); });
      grunt.tasks([ '_webpackage-prepareRelease' ], {}, expect(function b () {
        done();
      }).to.throw(/Invalid releaseVersion/));
    });
    it('should prepare the webpackage to be released', function (done) {
      process.nextTick(function () { stdin.send(releaseVersion + '\n'); });

      grunt.tasks([ '_webpackage-prepareRelease' ], {}, function () {
        fs.readFile(manifestPath, 'utf8', function (err, data) {
          if (err) {
            throw new Error(err);
          } else {
            var manifest = JSON.parse(data);
            manifest.should.have.property('version', releaseVersion);
          }
          done();
        });
      });
    });
    it('should prepare the webpackage to be released using the default releaseVersion', function (done) {
      process.nextTick(function () { stdin.send('\n'); });

      grunt.tasks([ '_webpackage-prepareRelease' ], {}, function () {
        fs.readFile(manifestPath, 'utf8', function (err, data) {
          if (err) {
            throw new Error(err);
          } else {
            var manifest = JSON.parse(data);
            manifest.should.have.property('version', defaultReleaseVersion);
          }
          done();
        });
      });
    });
    it('should prepare the webpackage to be released using the current manifest releaseVersion', function (done) {
      process.nextTick(function () { stdin.send('\n'); });

      grunt.tasks([ '_webpackage-prepareRelease' ], {}, function () {
        fs.readFile(fixedManifestPath, 'utf8', function (err, data) {
          if (err) {
            throw new Error(err);
          } else {
            var manifest = JSON.parse(data);
            manifest.should.have.property('version', defaultReleaseVersion);
          }
          done();
        });
      });
    });
  });
  describe('run grunt task "_webpackage-prepareRelease", webpackage path configured in webpackagepath', function () {
    var releaseVersion;
    beforeEach(function () {
      // Init config
      grunt.initConfig({
        webpackagepath: testPath
      });
      releaseVersion = '1.2.3';
    });
    afterEach(function () {
      grunt.initConfig({});
    });
    it('should prepare the webpackage to be released', function (done) {
      process.nextTick(function () { stdin.send(releaseVersion + '\n'); });

      grunt.tasks([ '_webpackage-prepareRelease' ], {}, function () {
        fs.readFile(manifestPath, 'utf8', function (err, data) {
          if (err) {
            throw new Error(err);
          } else {
            var manifest = JSON.parse(data);
            manifest.should.have.property('version', releaseVersion);
          }
          done();
        });
      });
    });
  });
  describe('run grunt task "_webpackage-updateToNextVersion", webpackage path configured in param.src', function () {
    var nextVersion;
    beforeEach(function () {
      // Init config
      grunt.initConfig({
        param: {
          src: testPath
        }
      });
      nextVersion = '1.2.3-SNAPSHOT';
    });
    afterEach(function () {
      grunt.initConfig({});
    });
    it('should throw error since provided nextVersion is invalid', function (done) {
      process.nextTick(function () { stdin.send(defaultReleaseVersion + '\n'); });
      grunt.tasks([ '_webpackage-updateToNextVersion' ], {}, expect(function a () {
        done();
      }).to.throw(/Invalid nextVersion/));
    });
    it('should update manifest version to nextVersion', function (done) {
      process.nextTick(function () { stdin.send(nextVersion + '\n'); });

      grunt.tasks([ '_webpackage-updateToNextVersion' ], {}, function () {
        fs.readFile(manifestPath, 'utf8', function (err, data) {
          if (err) {
            throw new Error(err);
          } else {
            var manifest = JSON.parse(data);
            manifest.should.have.property('version', nextVersion);
          }
          done();
        });
      });
    });
    it('should update manifest version to default nextVersion', function (done) {
      process.nextTick(function () { stdin.send('\n'); });
      grunt.tasks([ '_webpackage-updateToNextVersion' ], {}, function () {
        fs.readFile(manifestPath, 'utf8', function (err, data) {
          if (err) {
            throw new Error(err);
          } else {
            var manifest = JSON.parse(data);
            manifest.should.have.property('version', defaultNextVersion);
          }
          done();
        });
      });
    });
  });
})();
