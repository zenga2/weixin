const {log} = require('../plugins/log')
const {objToString} = require('../utils/utils')

module.exports = () => async (ctx, next) => {
  const {path, method, query, href, ip, header} = ctx.request
  // 打印访问日志
  log(`path: ${path}; method: ${method}; ${objToString(query)}; queryUrl: ${href}; from: ${ip}\n ${header}`)

  await next()
}