var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var please = require('gulp-pleeease');
var uglify = require('gulp-uglify');
// var webserver = require('gulp-webserver');

gulp.task('sass', function(){
  gulp.src('./src/sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(please
      ({
        autoprefixer: { 'browsers': ['last 2 versions', 'ie 6', 'ie 7', 'ie 8', 'Safari 4', 'Android 2.3', 'iOS 4'] }
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function(){
  gulp.src('./src/js/common.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

// gulp.task('webserver', function(){
//   gulp.src('./dist')
//     .pipe(
//       webserver({
//         host: '192.168.0.5',
//         port: '8003',
//         livereload: true
//       })
//   );
// });




gulp.task('default', ['sass', 'js']);

gulp.task('w', function(){
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/js/*.js', ['js'])
});

gulp.task('p', function(){
  gulp.src('./src/js/plugin/*.js')
    .pipe(concat('plugin.js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});
