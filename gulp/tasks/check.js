'use strict';

var gulp = require('gulp');
var checkDeps = require('gulp-check-deps');
var postcss = require('gulp-postcss');
var doiuse = require('doiuse');
var sequence = require('run-sequence');
var CONFIG = require('../config.js');

gulp.task('check', function(cb) {
  sequence('check:deps', 'check:browserSupport', cb)
});

// Check npm dependencies
gulp.task('check:deps', function() {
    return gulp.src('package.json').pipe(checkDeps());
});

// Check browser support
gulp.task('check:browserSupport', function() {
  return gulp.src(['_build/assets/css/foundation.css'])
    .pipe(postcss([doiuse({
      browsers: CONFIG.CSS_COMPATIBILITY,
      onFeatureUsage: function (usageInfo) {
        console.log(usageInfo.message)
      }
    })]))
});
