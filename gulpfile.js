// # Modulos requeridos
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var gutil        = require('gulp-util');
var fs           = require('fs');




// # Rutas
var DEV_DIR = '.';



// # Log errores a consola y archivo
function errorLog(error) {
    gutil.beep();
    console.log(error);
    
    var format_error = "\n\n======================================\n\n";
    fs.appendFileSync('gulp-error.log', format_error + error);
    
    this.emit('end');
}


// Log archivo modificado a consola
function logChangedFile(event) {
    browserSync.reload();
    
    // Ruta relativa a este archivo
    var changed_file_path = event.path.replace(__dirname, '');

    console.log(gutil.colors.yellow('[' + event.type + '] ') + gutil.colors.red(changed_file_path) + "\n");
}



// # TAREAS -------------------------


gulp.task('browserSync', function () {
    browserSync.init({
        server: DEV_DIR,
        notify: false,
        open: true,
        online: true,
        tunnel: false
    });
});



gulp.task('watch', ['browserSync'], function () {
    gulp.watch(DEV_DIR   + '/**/*.html', logChangedFile);
    gulp.watch(CSS_DIR   + '/**/*.css', logChangedFile);
    gulp.watch(JS_DIR   + '/**/*.js',   logChangedFile);
});



gulp.task('default', ['watch']);

