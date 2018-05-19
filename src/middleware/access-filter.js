const {log} = require('../plugins/log')
const {objToString} = require('../utils/utils')

function headersToString(headers) {
  return Object.keys(headers).reduce((result, key) => {
    return result + headers[key] + '\n'
  }, '')
}

module.exports = () => async (ctx, next) => {
  const {path, method, query, href, ip} = ctx.request
  // 打印访问日志
  log(`path: ${path}; method: ${method}; ${objToString(query)}; queryUrl: ${href}; from: ${ip}\n ${headersToString(ctx.req.headers)}`)


  await next()
}