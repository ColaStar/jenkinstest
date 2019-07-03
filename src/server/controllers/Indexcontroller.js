class IndexController {
  constructor() {

  }
  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('books/index',{
      user: {
        name: 'fundon',
        email: 'cfddream@gmail.com'
      }
    })
    
  }
}

module.exports = IndexController