var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    cssmin = require("gulp-cssmin"),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    concat = require('gulp-concat');


gulp.task('styles', function () {
    gulp.src([
        './resources/assets/styles/main.scss'
    ])
        .pipe(sass({
            noCache: true,
            lineNumbers: false,
            includePaths: ['bower_components/foundation/scss'],
            loadPath: './public/assets/styles/*'
        }))
        .pipe(concat("main.css"))
        .pipe(gulp.dest('./public/assets/styles'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/assets/styles'));
});

gulp.task('js', function () {
    // main app js file
    gulp.src([
        './resources/assets/js/app.js'
    ])
        .pipe(uglify())
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest('./public/assets/js/'));

    // create 1 vendor.js file from all vendor plugin code
    gulp.src([
        './bower_components/modernizr/modernizr.js',
        './bower_components/jquery/dist/jquery.js',
        './bower_components/fastclick/lib/fastclick.js',
        './bower_components/jquery.cookie/jquery.cookie.js',
        './bower_components/jquery-placeholder/jquery.placeholder.js',
        './bower_components/foundation/js/foundation.min.js'
    ])
        .pipe(uglify())
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('fonts', function () {
    gulp.src([
        './resources/assets/fonts/**/*.*'
    ])
        .pipe(gulp.dest('./public/assets/fonts/'));

});

gulp.task('images', function () {
    gulp.src([
        './resources/assets/images/**/*.*'
    ])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./public/assets/images/'));

});


gulp.task('watch', function () {
    gulp.run('default');

    gulp.watch('./resources/assets/styles/**/*.scss', function () {
        gulp.run('styles');
    });

    gulp.watch('./resources/assets/js/**/*.js', function () {
        gulp.run('js');
    });

    gulp.watch('./resources/assets/fonts/**/*.*', function () {
        gulp.run('fonts');
    });

    gulp.watch('./resources/assets/images/**/*.*', function () {
        gulp.run('images');
    });

});

gulp.task('default', ['styles', 'js', 'fonts', 'images']);