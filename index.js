const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('before one')
  await next()
  console.log('after one')
})

app.use(async (ctx) => {
  console.log('before two')
  ctx.body = 'Hello World!'
  console.log('after two')
})

app.use(async (ctx) => {
  console.log('before three')
  ctx.body = 'xxxx'
  console.log('after three')
})

app.listen(3000)
