var gulp           = require('gulp'),
    gutil          = require('gulp-util' ),
    less           = require('gulp-less'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'),
    del            = require('del');

// var jshint = require("gulp-jshint");

const paths = {
    frontJS_source : "front_JS/**/*.js",
    frontJS_dest : "public/javascripts/"
}

/*extra modules: 
    «gulp-less» для преобразования LESS-файлов в CSS-файлы, 
    «gulp-rename» для переименования файла в соответствии с заданным шаблоном, 
    «gulp-clean-css» для минификации (удаления лишнего с целью минимизации раз-
мера) CSS-файла, 
    «del» для удаления файлов. */

/*functions: 
    «src()» обеспечивает работу с
исходными кодами, принимая в качестве параметра шаблон путей. 
    «pipe()» обеспечивает передачу файлов от одной функции к другой, 
    «dest()» определяет место назначения.*/


// Пользовательские скрипты проекта
gulp.task('common-js', function() {
    return gulp.src([
        // сюда добавлять свои скрипты
        'front_JS/membersHTNL.js',
    ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('js', ['common-js'], function() {
    return gulp.src([
        // все плагины добавлять перед common
        ('public/javascripts/common.min.js'), // Всегда в конце
    ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest(paths.frontJS_dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("lint", function() {
  return gulp.src("./src/*.js")
  
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: '/'
        },
        notify: false,
    });
});

gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(less())
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/stylesheets'))
        //.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['less', 'js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch(['front_JS/*.js'], ['js']);
});

const cleanStyles = ()=>del(["assets"]);

function styles() {
    return gulp.src('less/**/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/stylesheets/'));
}

const cleanJS = () => del(paths.frontJS_dest);
function buildFrontJS() {
    return gulp.src(paths.frontJS_source)
      .pipe(babel())
    //   .pipe(concat('front.js'))
      .pipe(gulp.dest(paths.frontJS_dest));
}

// ?
// gulp.task("default", gulp.series(cleanStyles, styles, cleanJS, buildFrontJS));

gulp.task('default', ['watch']);
