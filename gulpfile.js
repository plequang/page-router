/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');


// Lint JavaScript
gulp.task('jshint', function () {
	return gulp.src([
		'page-router.html'
	])
		.pipe(reload({stream: true, once: true}))
		.pipe($.jshint.extract()) // Extract JS from .html files
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});


//
gulp.task('serve', [], function () {
	browserSync.init({
		notify: false,
		// Run as an https by uncommenting 'https: true'
		// Note: this uses an unsigned certificate which on first access
		//       will present a certificate warning in the browser.
		// https: true,
		server: {
			baseDir: ['tests'],
			directory: true,
			routes: {
				'/bower_components': 'bower_components',
				'/bower_components/page-router': '.'
			}
		}
	});
	gulp.watch(['*.html'], reload);
	gulp.watch(['tests/**/*.html'], reload);
	gulp.watch(['tests/**/*.js'], reload);

});

gulp.task('default', ['serve']);



