//管理所有路由
const router = require('koa-simple-router')
const IndexController = require('./Indexcontroller')
const Bookcontroller = require('./Bookcontroller')
const indexController = new IndexController()
const bookcontroller = new Bookcontroller()
module.exports = (app)=>{
    app.use(router(_=>{
        _.get('/',indexController.actionIndex)
        // 伪静态
        _.get('/index.html',indexController.actionIndex)
        _.get('/list',bookcontroller.actionList)
        _.get('/del',bookcontroller.actionList)
    }))
}