const gulp = require('gulp')
const { dest } = gulp
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')

const globs = {
  view: ['src/view/**/*.pug'],
  style: ['src/style/**/*.styl']
}

function viewTask(cb) {
  gulp
    .src(globs.view)
    .pipe(pug())
    // .pipe(minify())
    .pipe(dest('dist/view'))

  cb()
}
function styleTask(cb) {
  gulp
    .src(globs.style)
    .pipe(stylus())
    .pipe(dest('dist/css'))

  cb()
}
function defaultTask(cb) {
  viewTask(cb)
  styleTask(cb)
}
const tasks = {}
;[defaultTask, viewTask, styleTask].forEach(task => {
  tasks[task.name] = gulp.watch( , function(cb) {
    task(cb)
  })
});

exports.default = defaultTask
exports.view = viewTask
exports.style = styleTask
