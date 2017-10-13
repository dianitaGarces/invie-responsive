var gulp = require('gulp');
var postcss = require ('gulp-postcss');
var cssnext = require('postcss-cssnext');
var mixins = require('postcss-mixins');
var browserSync = require('browser-sync').create();
var atImport = require ('postcss-import');
var lost = require ('lost');

/*var autoprefixer = require('autoprefixer');*/
var cssnested = require('postcss-nested');

//servidor de desarrollo
gulp.task('serve', function (){
	browserSync.init({
		server:{
			baseDir:'./dist'
		}
	})
})

//tarea para procesar el css
gulp.task('css',function (){
	var processos = [
	/*autoprefixer({browsers: ['> 5%','ie 8']}), incluido cssnext*/
	atImport(),
	mixins(),
	cssnested,	
	lost(),
	cssnext({browsers: ['> 5%','ie 8']})
	]
	
	return gulp.src('./src/invie.css')
	.pipe(postcss(processos))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream())//para actualizar el navegador
	
})

//tarea para vigilar los cambios del navegador
gulp.task('watch', function(){
	gulp.watch('./src/*.css',['css'])
	gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

gulp.task('default',['watch', 'serve', 'css'])