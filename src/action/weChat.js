const sha1 = require('sha1')
const getRawBody = require('raw-body')
const {parseString} = require('xml2js')
const config = require('../config')
const token = config.weixin.token

module.exports = async (request, response, ctx) => {
  const {signature, timestamp, nonce, echostr} = request.query

  // 验证微信服务器
  if (signature && timestamp && nonce && echostr) {
    const str = [token, timestamp, nonce].sort().join('')
    const strAfterSha1 = sha1(str)
    response.body = strAfterSha1 === signature ? echostr : ''
  } else {
    await replyMessage(request, response, ctx)
  }
}


async function replyMessage(request, response, ctx) {
  const xmlText = await getRawBody(ctx.req, {
    length: ctx.req.headers['content-length'],
    limit: '1mb',
    encoding: 'utf8'
  })

  console.log('xmlText', xmlText)

  // 该方法是同步的
  parseString(xmlText, {trim: true}, (err, result) => {
    if (err) throw err

    const msgData = formateWeChatMsg(result)
    console.log('msgData', msgData)
    response.body = `<xml>
            <ToUserName><![CDATA[${msgData.FromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${msgData.ToUserName}]]></FromUserName>
            <CreateTime>${+new Date()}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType> 
            <Content><![CDATA[Hello, ${msgData.Content}]]></Content>
          </xml>`
  })

}

function formateWeChatMsg(msgData) {
  msgData = msgData.xml

  return Object.keys(msgData).reduce((result, prop) => {
    const val = msgData[prop]
    result[prop] = Array.isArray(val) ? val[0] : val
    return result
  }, {})
}
