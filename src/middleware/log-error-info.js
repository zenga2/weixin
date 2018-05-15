const {log} = require('../plugins/log')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    log(`${e.message}\n${e.stack}`)
    ctx.response.body = {
      errorNo: -1,
      msg: '服务器异常'
    }
  }
}

