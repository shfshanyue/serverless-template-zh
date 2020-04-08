import Koa from 'koa'

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = `hello, path: '${ctx.request.path}'`
})

app.listen(3333, () => { console.log('Listening 3333') })

module.exports = app

