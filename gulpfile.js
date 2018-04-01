var gulp = require("gulp");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");

// File paths
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";

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
		.pipe(uglify())
		.pipe(concat("scripts.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Images
gulp.task("images", function() {
	console.log("Starting images task.");
});

// Default
gulp.task("default", function() {
	console.log("Starting default task.");
});

//Watch

gulp.task("watch", function() {
	console.log("Starting watch task.");
	require("./server.js");
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ["scripts"]);
	// gulp.watch(CSS_PATH, ["styles"]);
	gulp.watch("../public/scss/**/*.scss", ["styles"]);
});
