const gulp = require('gulp');
const babel = require('gulp-babel'); //es->es5
const watch = require('gulp-watch'); //gulp监听
const rollup = require('gulp-rollup'); //流清洗
const replace = require('rollup-plugin-replace'); //替换
const entry = "./src/server/**/*.js";
const cleanEntry = "./src/server/config/index.js";
const eslint = require('gulp-eslint');


//开发环境
function builddev() {
  return watch(entry, {
    ignoreInitial: false
  }, function () {
    gulp.src(entry)
      .pipe(babel({
        babelrc: false,
        "plugins": ["@babel/plugin-transform-modules-commonjs", ["@babel/plugin-proposal-decorators", {
          legacy: true
        }]]
      }))
      .pipe(gulp.dest('dist'));
  })
}

//上线环境
function buildprod() {
  return gulp.src(entry)
    .pipe(babel({
      babelrc: false,
      ignore: [cleanEntry],
      "plugins": ["@babel/plugin-transform-modules-commonjs", ["@babel/plugin-proposal-decorators", {
        legacy: true
      }]]
    }))
    .pipe(gulp.dest('dist'));
}

//清洗流
function buildconfig() {
  return gulp.src(entry)
    // transform the files here.
    .pipe(rollup({
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ],
      output: {
        format: 'cjs'
      },
      input: cleanEntry
    }))
    .pipe(gulp.dest('./dist'));
}

//代码校验
function buildhint() {
  return gulp.src([entry])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
let build = gulp.series(builddev);

//先完成核心的编译流程再清洗node代码流程
if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildprod, buildconfig);
}

if (process.env.NODE_ENV == 'hint') {
  build = gulp.series(buildhint);
}

gulp.task("default", build);
