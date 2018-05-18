const sha1 = require('sha1')
const replyMessage = require('./replyMessage')

const config = require('../../config/index')
const token = config.weixin.token

module.exports = async (request, response, ctx) => {
  const {signature, timestamp, nonce, echostr} = request.query
  const method = request.method

  if (!isWeChatServer(signature, timestamp, nonce)) {
    return response.body = ''

  }

  method === 'GET' ? response.body = echostr :
  method === 'POST' ? await replyMessage(request, response, ctx) : response.status = 404
}

function isWeChatServer(signature, timestamp, nonce) {
  const str = [token, timestamp, nonce].sort().join('')
  return signature === sha1(str)
}
