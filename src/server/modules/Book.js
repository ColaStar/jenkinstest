const SafeRequest = require('../utils/safeRequest')
/** 
 * 
 * @fileoverview  实现Books数据模型
 * @author lvjianwy@yeah.net
 * */
class Books{
/**
 * Books获取后台相关图书相关的数据类
 * @class
 */
/**
 * @parma {object} appKOA2执行上下文
 */

 constructor(app){
    this.app = app
 }
 /** 
  * 获取后台全部图书列表
  * @parma
  * @example
  * return promise
  * getListdata
 */
 getListdata(option,params){
     const safeRequest = new SafeRequest(option.url,params);
     return safeRequest.fetch();
 }
}
module.exports = Books;