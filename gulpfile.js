var gulp=require('gulp');
var browserSync=require('browser-sync').create();

gulp.task('browser-sync',function(){
    var files=
        [
            '**/*.html',
            '**/*.css',
            '**/*.js',
            '**/*.jsx'
        ];
    browserSync.init(files,{
        server:{
            baseDir:"./"
        }
    });
});

gulp.task('default',['browser-sync']);