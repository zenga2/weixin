const verifyWeixin = require('./middleware/verify-weixin')
const routerManager = require('./middleware/router-manager')
const router = require('./router')
const Koa = require('koa')

const app = new Koa()

// 验证微信消息
app.use(verifyWeixin())

// 路由必须放在最后
app.use(routerManager(router))

app.listen(80)
