const Koa = require('koa')
const routerManager = require('./middleware/router-manager')
const accessFilter = require('./middleware/access-filter')
const logErrorInfo = require('./middleware/log-error-info')
const router = require('./router')
const {log} = require('./plugins/log')


// 这一行必须放在在前面
const app = new Koa()

app.on('error', err => {
  log(err)
})

// 打印错误信息
app.use(logErrorInfo())

// 访问拦截器
app.use(accessFilter())

// 路由必须放在最后
app.use(routerManager(router))

app.listen(80)
