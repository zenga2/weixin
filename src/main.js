const routerManager = require('./middleware/router-manager')
const accessFilter = require('./middleware/access-filter')
const router = require('./router')
const Koa = require('koa')

const app = new Koa()

// 拦截器，放在最前面
app.use(accessFilter())

// 路由必须放在最后
app.use(routerManager(router))

app.listen(80)
