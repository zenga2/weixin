const sha1 = require('sha1')
const config = require('../config')
const token = config.weixin.token

module.exports = (request, response) => {
  const {signature, timestamp, nonce, echostr} = request.query

  // 验证微信服务器
  if (signature && timestamp && nonce && echostr) {
    const str = [token, timestamp, nonce].sort().join('')
    const strAfterSha1 = sha1(str)
    response.body = strAfterSha1 === signature ? echostr : ''
  } else {
    replyMessage(request, response)
  }
}


function replyMessage(request, response) {

}
