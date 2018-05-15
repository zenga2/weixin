const sha1 = require('sha1')
const getRawBody = require('raw-body')
const config = require('../config')
const token = config.weixin.token

module.exports = (request, response, ctx) => {
  const {signature, timestamp, nonce, echostr} = request.query

  // 验证微信服务器
  if (signature && timestamp && nonce && echostr) {
    const str = [token, timestamp, nonce].sort().join('')
    const strAfterSha1 = sha1(str)
    response.body = strAfterSha1 === signature ? echostr : ''
  } else {
    replyMessage(request, response, ctx)
  }
}


function replyMessage(request, response, ctx) {
  getRawBody(ctx.req, {
    length: ctx.req.headers['content-length'],
    limit: '1mb',
    encoding: 'utf8'
  }).then(data => {
    console.log(data)
  })
}
