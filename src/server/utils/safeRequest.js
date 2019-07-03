const fetch = require('node-fetch');
const config = require('../config')
class SafeRequest {
  constructor(url,params) {
    this.url = url;
    this.baseUrl = config.baseUrl;
    this.params = params || {id:3}
  }
  fetch() {
      let result = {
          code:0,
          message:'请求成功',
          data:[]
      }
      return new Promise((resolve, reject) => {
        let requestFetch = fetch(this.baseUrl+this.url);
        requestFetch.then(res => res.json()) // expecting a json response
        .then(json => {
            result.data = json
            resolve(result)
        }).catch(error=>{
            result.code = 1
            result.message = '请求失败'
            reject(result)//yi ding ya一定要让他返回
        })
    })
      //{ method: 'POST', body: 'a=1' }删除借口使用post新加post请求类
    // return new Promise((resolve, reject) => {
    //     let requestFetch = fetch(this.baseUrl+this.url+'&id='+this.params.id,post);
    //     console.log(this.baseUrl+this.url+'&id='+this.params.id)
    //     requestFetch.then(res => res.json()) // expecting a json response
    //     .then(json => {
    //         result.data = json
    //         resolve(result)
    //     }).catch(error=>{
    //         result.code = 1
    //         result.message = '请求失败'
    //         reject(result)//yi ding ya一定要让他返回
    //     })
    // })

  }
}

module.exports = SafeRequest;
