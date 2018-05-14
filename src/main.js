const verifyWeixin = require('./middleware/verify-weixin')
const Koa = require('koa')

const app = new Koa()

// 验证微信消息
app.use(verifyWeixin())

app.listen(80)
