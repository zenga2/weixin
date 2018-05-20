const {firstLetterToUpperCase} = require('../../utils/stringUtils')
const {isPlainObject} = require('../../utils/typeUtils')

module.exports = function createMsgXml(queryMsgData, data) {
  const {toUserName, fromUserName} = queryMsgData
  const replyMsgData = Object.assign({
    toUserName: fromUserName,
    fromUserName: toUserName,
    createTime: Math.round(+new Date() / 1000)
  }, data)

  return `<xml>${createMsg(replyMsgData)}</xml>`
}

function createMsg(msgData) {
  return Object.keys(msgData).reduce((result, key) => {
    const val = msgData[key]
    const tagName = firstLetterToUpperCase(key)

    return result + `<${tagName}>${
      Array.isArray(val) ? val.map(item => `<item>${createMsg(item)}</item>`).join('') :
      isPlainObject(val) ? createMsg(val) : `<![CDATA[${val}]]>`
      }</${tagName}>`
  }, '')
}

// const msgData = {
//   toUserName: 'wqerwer',
//   fromUserName: 'skjdhfkjsfk',
//   createTime: '23425252525',
//   msgType: 'news',
//   articleCount: 2,
//   articles: [
//     {title: 'skdjhsdkghskg', description: 'hhaoaoaoa', picUrl: 'sdfs', url: 'wejhkwwerk'},
//     {title: 'skdjhsdkghskg', description: 'hhaoaoaoa', picUrl: 'sdfs', url: 'wejhkwwerk'}
//   ]
// }
//
// console.log(createMsgXml(msgData))
