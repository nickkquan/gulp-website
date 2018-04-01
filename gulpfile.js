var gulp = require("gulp");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");

// File paths
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";

// Styles
gulp.task("styles", function() {
	console.log("Starting styles task.");
	return gulp
		.src(["public/css/reset.css", "public/css/home.css"])
		.pipe(
			plumber(function(error) {
				console.log("Styles task error");
				console.log(error);
				this.emit("end");
			})
		)
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions", "ie 8"]
			})
		)
		.pipe(concat("styles.css"))
		.pipe(minifyCss())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task("scripts", function() {
	console.log("Starting scripts task.");
	return gulp
		.src(SCRIPTS_PATH)
		.pipe(uglify())
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
	gulp.watch(CSS_PATH, ["styles"]);
});
