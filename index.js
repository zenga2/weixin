const sha1 = require('sha1')
const Koa = require('koa')
const app = new Koa()
const token = 'zengjunweixin'

app.use(async (ctx, next) => {
  const {signature, timestamp, nonce, echostr} = ctx.request.query
  const str = [token, timestamp, nonce].sort().join('')
  const strAfterSha1 = sha1(str)

  if (strAfterSha1 === signature) {
    ctx.response.body = echostr
  } else {
    ctx.response.body = ''
  }
})

app.listen(80)
