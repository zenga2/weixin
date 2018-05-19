const getRawBody = require('raw-body')
const {firstLetterToLowerCase} = require('../../utils/stringUtils')
const {promisify} = require('../../utils/utils')

const parseString = promisify(require('xml2js').parseString)

const replyFnMap = {
  text: require('./reply-text-msg')
}

module.exports = async function replyMessage(request, response, ctx) {
  const xmlText = await getRawBody(ctx.req, {
    length: request.length,
    limit: '1mb',
    encoding: request.charset
  })

  const msgData = formateWeChatMsg(await parseString(xmlText, {trim: true}))
  console.log('msgData', msgData)
  response.body = await replyFnMap[msgData.msgType](msgData)
  response.type = 'application/xml; charset=utf-8'
}

function formateWeChatMsg(msgData) {
  msgData = msgData.xml

  return Object.keys(msgData).reduce((result, prop) => {
    const val = msgData[prop]
    prop = firstLetterToLowerCase(prop)
    result[prop] = Array.isArray(val) ? val[0] : val
    return result
  }, {})
}