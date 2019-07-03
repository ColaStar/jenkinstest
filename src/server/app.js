const koa = require('koa');
const serve = require('koa-static');
const render = require('koa-swig');
const config = require('./config');
const co = require('co');
const errorHandler = require('./middlewares/errorhandler')
const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './dist/logs/error.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

const app = new koa();

app.use(serve(config.staticDir));

app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  varControls:["[[","]]"],
  // ssr渲染性能的瓶颈 'memory'
  cache: false, // disable, set to false
  ext: 'html',
  writeBody: false
}));
// 先让他next  再次的判断当前业务的情况
errorHandler.error(app,logger)
require('./controllers')(app);


app.listen(config.port, () => {
  console.log(config.port,'端口启动成功')
})
