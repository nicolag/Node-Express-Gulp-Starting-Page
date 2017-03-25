var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    ,stylus = require('gulp-stylus')
    ,rupture = require('rupture')
    ,jeet = require('jeet')
    ,nib = require('nib')
    ,axis = require('axis')
    ,browserSync = require('browser-sync').create();

gulp.task('inject', () => {
    var inject = require('gulp-inject');
    var ignorePath = '/public/';

    //follows sequence in array
    var cssFiles = gulp.src(
        ['./public/css/*.css'],
        {read: false}
    );
    var headJsFiles = gulp.src(
        ['./public/headJs/*.js',
        './public/lib/jquery/dist/jquery.min.js'],
        {read: false}
    );
    var footerJsFiles = gulp.src(
        ['./public/footerjs/*.js'],
        {read: false}
    );


    var headerJsOption = {
        starttag: '<!-- inject:headJs:{{ext}} -->',
        ignorePath: ignorePath
    };

    var footerJsOption = {
        ignorePath: ignorePath,
        starttag: '<!-- inject:footer:{{ext}} -->'
    };


    gulp.src('./views/index.html')
        .pipe(inject(cssFiles,{ignorePath: ignorePath}))
        .pipe(inject(headJsFiles, headerJsOption))
        .pipe(inject(footerJsFiles, footerJsOption))
        .pipe(gulp.dest('./views'));
});




gulp.task('start', () => {
    nodemon({
        script: 'app.js'
        , env: { 'NODE_ENV': 'development' }
    })
});


gulp.task('browserSync', () => {
    browserSync.init({
        proxy: "http://localhost:33333/index.html",
        reloadOnRestart: true,
        port: 3232,
        ui:{
            port: 3939 //external port
        }
    });

    browserSync.watch(["./public/css/*","./public/styl/*"],function () {
        browserSync.reload("*.css");
    });
    browserSync.watch(["./views"],function () {
        browserSync.reload("*/index.html");
    });

});

gulp.task('styl', () => {
    return gulp.src('./public/styl/styles.styl')
        .pipe(stylus({
            use:[rupture(), jeet(), nib(), axis()],
            compress:false
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.watch(['./public/styl/*','./public/styl/*/*'],['styl']);


gulp.task('default',['start', 'browserSync']);