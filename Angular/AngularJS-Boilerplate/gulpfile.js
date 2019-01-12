const gulp 			= require('gulp'),
	  sass 			= require('gulp-sass'),
	  autoprefixer 	= require('gulp-autoprefixer'),
	  wait 			= require('gulp-wait'),
	  imagemin 		= require('gulp-imagemin'),
	  webserver 	= require('gulp-webserver');
	  rename	 	= require('gulp-rename');
	  cssmin 		= require('gulp-cssmin'),
	  browserSync 	= require('browser-sync').create();


//SASS
gulp.task('sass', function() {
    return gulp.src('./_sass/main.scss')
        .pipe(wait(500))
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('sass-watch', ['sass'], function() {
    gulp.watch('./_sass/**/*.scss', ['sass'])
});


gulp.task('res', function() {
    gulp.src(['./res/*.jpg', './res/*.png', './res/*.svg'])
        .pipe(imagemin())
        .pipe(gulp.dest('./res/'));
});

gulp.task('server', function () {

	browserSync.init({
        server: "./",
        port: 8082
    });

    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("*.js").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./modules/**/*.html").on('change', browserSync.reload);
    gulp.watch("./modules/**/*.js").on('change', browserSync.reload);
    gulp.watch("./modules/**/**/*.html").on('change', browserSync.reload);
    gulp.watch("./modules/**/**/*.js").on('change', browserSync.reload);
    
});

gulp.task('default', ['sass-watch', 'res', 'server']);