var _ = require('lodash'),
    gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    linker = require('gulp-linker'),
    server = require('gulp-express'),
    mocha = require('gulp-mocha'),
    karma = require('karma').server,
    wrap = require('gulp-wrap'),
    manifest = require('./src/Manifest'),
    fs = require('fs'),
    argv = require('yargs').argv;

gulp.task('default', ['css', 'js', 'link'], function () {
  // place code for your default task here
});

gulp.task('css', function () {
  return gulp.src(manifest.client.dir + '/less/application.less')
      .pipe(less())
      .pipe(gulp.dest(manifest.client.dir + '/static/css'))
      .pipe(minifyCss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(manifest.client.dir + '/static/css'))
});

gulp.task('js', function () {
  return gulp.src(manifest.client.files)
      .pipe(concat('application.js'))
      .pipe(wrap("var ia = (function(){\n<%= contents %>\nreturn ia;\n})();"))
      .pipe(gulp.dest(manifest.client.dir + '/static/js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(manifest.client.dir + '/static/js'))
});

gulp.task('link', ['js'], function () {
  return gulp.src(manifest.server.dir + '/views/**/*.ejs')
    // Link the JavaScript
      .pipe(linker({
        scripts: argv.production ? manifest.client.dir + '/static/js/application.min.js' : manifest.client.filesWithoutTests,
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: manifest.client.dir
      }))
      .pipe(gulp.dest(manifest.server.dir + '/views'));
});

gulp.task('testClient', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('testServer', function() {
  return gulp.src(manifest.serverTest.files, {read: false})
      .pipe(mocha());
});

gulp.task('test', ['testClient', 'testServer'], function () {
});

gulp.task('watch', ['css', 'js', 'link'], function () {
  gulp.watch('assets/less/**/*.less', ['css']);
  gulp.watch(manifest.client, ['js', 'link']);
});

gulp.task('run', ['watch'], function () {
  // Start the server at the beginning of the task
  server.run({
    file: 'main.js'
  });

  // Restart the server when file changes
  //gulp.watch(['controllers/**/*.js'], server.notify);
});