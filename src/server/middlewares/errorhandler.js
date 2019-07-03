// 404  500  最后在加别的
const errorHandler = {
    error(app,logger){
        app.use(async (ctx,next)=>{
            try{
                await next();
            }catch(error){
                ctx.status = error.status || 500;
                logger.error(error);
                ctx.body = '内部发生错误'//变成图
            }
        })
      app.use(async (ctx,next)=>{
          await next();
          if(ctx.status != 404){
              return;
          }
          //404业务变动长时间404，会发生降权status
            ctx.status = 404;
            ctx.body = "<script type='text/javascript' src='//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js' charset='utf-8'></script>"
        
      })
    //   app.use((ctx,next)=>{
    //     await next()
    // })
    }
}
module.exports = errorHandler;