var gulp = require('gulp'),
concat = require('gulp-concat'),
minifycss = require('gulp-minify-css'),
uglify = require('gulp-uglify'),
clean = require('gulp-clean'),
rename = require('gulp-rename'),
uncss = require('gulp-uncss'),
autoprefix = require('gulp-autoprefixer'),
imagemin = require('gulp-imagemin'),
glob = require('glob');

var paths = {
    html: [
        '../_site/index.html',
    ],
    css: [
        '../static/css/*.css'
    ],
    images: [
        '../static/img/logo.png',
    ]
};

// Clean
gulp.task('clean', function () {
    return gulp.src(['../public'], {
        read: false
    }).pipe(clean({force: true}));
});

gulp.task('css', ['clean'], function () {
    gulp.src(paths.css)
    .pipe(concat('oslab.min.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(gulp.dest('../public/css'));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('../public/img'));
});

// watch files for changes
gulp.task('watch', function () {
    gulp.watch(paths.css, ['css']);
});

gulp.task('build', ['css', 'images'], function () {
    gulp.src('../public/css/oslab.min.css')
        .pipe(uncss({
            html: glob.sync('../_site/**/*.html')
        }))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(gulp.dest('../public/css'));
});

// the default task (called when you run `gulp` from cli)
gulp.task('default', ['css', 'images', 'watch']);
