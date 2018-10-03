var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var insert = require('gulp-insert');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');

var config = {
    src: './src',
    tmp: '.tmp',
    build: './build',
}

gulp.task('html', function(){
    return gulp.src(config.src+'/index.html')
        .pipe(gulp.dest(config.build));
});

gulp.task('sass', function () {
  return gulp.src([config.src+'/style/reset.scss', config.src+'/style/variables.scss', config.src+'/style/*.scss', config.src+'/**/*.scss', config.src+'/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build));
});

gulp.task('templateCache', function(){
    return gulp.src([config.src + '/**/*.tpl.html'])
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
        }))
        .pipe(angularTemplatecache('templateCacheHtml.js', {
            module: 'gulp.templateCache'
        }))
        .pipe(gulp.dest(config.tmp + '/partials/'));
});

gulp.task('vendor', function(){
    return gulp.src([config.src + '/vendor.js'])
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest(config.tmp + '/vendor/'));
});

gulp.task('js', ['templateCache', 'vendor'], function(){
    return gulp.src([config.tmp+'/vendor/', config.src+'/**/*.module.js', config.src+'/**/*.js', config.tmp+'/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js', {newLine: '\n})();\n(function(){\n'}))
        .pipe(insert.prepend('(function(){\n'))
        .pipe(insert.append('\n})();'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build));
});

gulp.task('build', ['html', 'sass', 'js'], function(){})

gulp.task('default', ['build'], function(){
    gulp.watch(config.src+'/**/*.*', function(event) {
        gulp.start('build');
    });
})