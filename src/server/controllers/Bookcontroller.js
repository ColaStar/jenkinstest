const Books = require('../modules/Book')
class BookController {
  constructor() {

  }
  async actionList(ctx, next) {
    const books = new Books();
    const result = await books.getListdata({
      url: 'country/index'
    })
    console.log(result)
    ctx.body = await ctx.render('books/pages/list', {
      result: result.data
    })

  }
  async actionTagBooks(ctx, next) {
    ctx.body = await ctx.render('books/taglist')
  }
  async actionDel(ctx, next) {
    console.log(ctx.req.url.slice(8, 9))
    var num = ctx.req.url.slice(8, 9)
    const books = new Books();
    const result = await books.getListdata({
      url: 'country/delete',
      parmas: {
        id: num
      }
    })
    ctx.body = result

  }
}
module.exports = BookController
