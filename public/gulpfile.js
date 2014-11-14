var gulp = require( 'gulp' );
var wiredep = require( 'wiredep' ).stream;
var browserify = require( 'gulp-browserify' );
var plumber = require( 'gulp-plumber' );
var ngAnnotate = require( 'gulp-ng-annotate' );
var minifyHTML = require( 'gulp-minify-html' );
var uglify = require( 'gulp-uglify' );
var notify = require( "gulp-notify" );
var watch = require( 'gulp-watch' );
var livereload = require( 'gulp-livereload' );
var sass = require( 'gulp-ruby-sass' );
var prefix = require( 'gulp-autoprefixer' );
var browserSync = require( 'browser-sync' );

gulp.task( 'bower', function() {
  gulp.src( './template.blade.php', { base: './' } )
    .pipe( wiredep() )
    .pipe( gulp.dest( './' ) );
} );

gulp.task( 'browserify', function() {
  var onError = function( err ) {
    notify.onError( {
      title   : "Gulp",
      subtitle: "JS Failure!",
      message : "Error: <%= error.message %>",
      sound   : "Beep"
    } )( err );
  };
  gulp.src( 'app/main.js' )
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( browserify() )
    .pipe( ngAnnotate() )
    //.pipe(uglify())
    .pipe( gulp.dest( 'dist' ) )
    .pipe( livereload() );
} );

gulp.task( 'minify-html', function() {
  gulp.src( './app/**/*.html' )
    .pipe( minifyHTML() )
    .pipe( gulp.dest( './views' ) )
    .pipe( livereload() );
} );

gulp.task( 'sass', function() {
  var onError = function( err ) {
    notify.onError( {
      title   : "Gulp",
      subtitle: "Sass Failure!",
      message : "Error: <%= error.message %>",
      sound   : "Beep"
    } )( err );
  };
  return gulp.src( './app/sass/main.scss' )
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe( prefix( "last 10 versions", "> 1%", "ie 8", "ie 7" ) )
    .pipe( gulp.dest( './css' ) )
    .pipe( notify( "Sass Finished!" ) )
    .pipe( livereload() );
} );

gulp.task( 'live', function() {
  gulp.src( [ './*.blade.php', './app/**/*.html' ] )
    .pipe( livereload() );
} );

gulp.task( 'watch', function() {
    gulp.watch( './app/**/*.scss', [ 'sass' ] ),
    gulp.watch( './app/**/**/**/**/**/*.js', [ 'browserify' ] ),
    gulp.watch( './*.blade.php', [ 'live' ] ),
    gulp.watch( './app/**/*.html', [ 'live' ] ),
    gulp.watch( './bower.json', [ 'bower' ] )
} )

gulp.task( 'browser-sync', function() {
  browserSync( {
    proxy: "http://localhost/anguLaravel%20boilerplate/public"
  } );
} );
gulp.task( 'default', [ 'browserify', 'sass', 'watch', 'bower'] );


