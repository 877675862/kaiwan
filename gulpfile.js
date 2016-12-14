/**
 * Created by hui on 16-12-14.
 */
var gulp = require('gulp');
/* It's can load all gulp plugins from package.json.
var gulpLoadPlugins = require('gulp-load-plugins');
var pl = gulpLoadPlugins();
*/

var less = require('gulp-less');
var cssMin = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var jsMin = require('gulp-uglify');
var imgMin = require('gulp-imagemin');
var zip = require('gulp-zip');
var fileConcat = require('gulp-concat');
var connect = require('gulp-connect');
var autoPreFixer = require('gulp-autoprefixer');
var fileRename = require('gulp-rename');
var template = require('gulp-template');
var jsonEDT = require('gulp-json-editor');
var revMd5 = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var fileInclude = require('gulp-file-include');
var OpenFU = require('gulp-open');
var Footer = require('gulp-footer');
var addFS = require('gulp-add');
// It's so long...maybe you need gulp-load-plugins.
// get json strings.
var fs = require('fs');
var MyTemplate = JSON.parse(fs.readFileSync('./myTemplate.json')); // To replace the .template()


gulp.task('css',function(){
    gulp.src('src/scss/entry.less')
        .pipe(less())
        .pipe(fileRename('kw.css'))
        .pipe(autoPreFixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('style/css'))
        .pipe(connect.reload());
});
gulp.task('js',function(){
    gulp.src('src/script/*.js')
        .pipe(gulp.dest('style/js'));
});
gulp.task('html',function(){
    gulp.src(['/**/*.html','index.html'])
        .pipe(template({
            CssLink:MyTemplate.cssLinks,
            JsSrc:MyTemplate.jsSrcs,
        }))
        //.pipe(fileInclude({
        //    prefix:'@@',
        //    basepath:'@file'
        //}))
        .pipe(gulp.dest(''))
        .pipe(connect.reload());
});
gulp.watch(['**/*.html','!src/**/*.html'],['html']);

gulp.task('include',function(){
    gulp.src(['index.html'])
        .pipe(fileInclude({
            prefix:"@@",
            basepath:"@file"
        }))
        .pipe(gulp.dest(''))

});
