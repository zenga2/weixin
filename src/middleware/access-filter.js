const {log} = require('../plugins/log')

function queryToString(query) {
  return Object.keys(query).reduce((result, prop) => {
    return `${result} ${prop}=${query[prop]},`
  }, 'param:').slice(0, -1)
}

module.exports = () => async (ctx, next) => {
  const {path, method, query, href} = ctx.request
  // 打印访问日志
  log(`path: ${path}; method: ${method}; ${queryToString(query)}; from: ${href}`)

  await next()
}