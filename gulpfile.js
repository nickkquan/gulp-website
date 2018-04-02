// Gulp
var gulp = require("gulp");

// All-purpose plug-ins
var concat = require("gulp-concat"); // Joins files together
var uglify = require("gulp-uglify"); // Removes new line and white space
var livereload = require("gulp-livereload"); // Reloads html document on change
var plumber = require("gulp-plumber"); // Error handling and persistent running of task
var sourcemaps = require("gulp-sourcemaps"); // Identifies root files instead of concat file

// CSS plug-ins
var minifyCss = require("gulp-minify-css"); // Removes new line and white space for CSS. Note: not needed for Sass
var autoprefixer = require("gulp-autoprefixer"); // Provides browser compatibility
var sass = require("gulp-sass"); // Sass

// JS plug-ins
var babel = require("gulp-babel"); // Compiles ES6 to ES5

// Delete plug-in
var del = require("del"); // Deletes dist files anytime tasks are run to keep files clean

// Handlebar plug-ins
var handlebars = require("gulp-handlebars"); // Converts handlebar templates
var handlebarsLib = require("handlebars"); // Handlebars module
var declare = require("gulp-declare"); // Lets us create variables inside Gulp
var wrap = require("gulp-wrap"); // Wraps file in code

// Image compression
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminJpegRecompress = require("imagemin-jpeg-recompress");

// File paths
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";
var SASS_PATH = "public/scss/**/*.scss";
var TEMPLATES_PATH = "templates/**/*.hbs";
var IMAGES_PATH = "public/images/**/*.{png,jpeg,jpg,svg,gif}";

// Scripts Task for CSS
//  gulp.task("styles", function() {
// 	console.log("Starting styles task.");
// 	return gulp
// 		.src(["public/css/reset.css", "public/css/home.css"])
// 		.pipe(
// 			plumber(function(error) {
// 				console.log("Styles task error");
// 				console.log(error);
// 				this.emit("end");
// 			})
// 		)
// 		.pipe(sourcemaps.init())
// 		.pipe(
// 			autoprefixer({
// 				browsers: ["last 2 versions", "ie 8"]
// 			})
// 		)
// 		.pipe(concat("styles.css"))
// 		.pipe(minifyCss())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(DIST_PATH))
// 		.pipe(livereload());
// });

// Scripts Task for Sass
gulp.task("styles", function() {
	console.log("Starting styles task.");
	return gulp
		.src("public/scss/styles.scss")
		.pipe(
			plumber(function(error) {
				console.log("Styles task error!");
				console.log(error);
				this.emit("end");
			})
		)
		.pipe(sourcemaps.init())
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions", "ie 8"]
			})
		)
		.pipe(
			sass({
				outputStyle: "compressed"
			})
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task("scripts", function() {
	console.log("Starting scripts task.");
	return gulp
		.src(SCRIPTS_PATH)
		.pipe(
			plumber(function(err) {
				console.log("Scripts task error!");
				console.log(err);
				this.emit("end");
			})
		)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["es2015"]
			})
		)
		.pipe(uglify())
		.pipe(concat("scripts.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Images
gulp.task("images", function() {
	return gulp
		.src(IMAGES_PATH)
		.pipe(
			imagemin([
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngquant(),
				imageminJpegRecompress()
			])
		)
		.pipe(gulp.dest(DIST_PATH + "/images"));
});

// Clean

gulp.task("clean", function() {
	console.log("Starting delete task");
	return del.sync([DIST_PATH]);
});

// Templates
gulp.task("templates", function() {
	console.log("Starting templates task");
	return gulp
		.src(TEMPLATES_PATH)
		.pipe(
			handlebars({
				handlebars: handlebarsLib
			})
		)
		.pipe(wrap("Handlebars.template(<%= contents %>)"))
		.pipe(
			declare({
				namespace: "templates",
				noRedeclare: true
			})
		)
		.pipe(concat("templates.js"))
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Default
gulp.task("default", ["clean", "images", "templates", "styles", "scripts"], function() {
	console.log("Starting default task.");
});

//Watch
gulp.task("watch", ["default"], function() {
	console.log("Starting watch task.");
	require("./server.js");
	livereload.listen();
	// // gulp.watch(CSS_PATH, ["styles"]);
	gulp.watch(SCRIPTS_PATH, ["scripts"]);
	gulp.watch(SASS_PATH, ["styles"]);
	gulp.watch(TEMPLATES_PATH, ["templates"]);
});
