const createMsgXml = require('./create-msg-xml')

module.exports = async msgData => {
  const {content} = msgData
  let data

  switch (content) {
    // 回复文本消息
    case '1':
      data = {msgType: 'text', content: '你好!'}
      break
    // 回复图片消息
    case '2':
      data = {msgType: 'image', mediaId: 'L6mDCOI6FVP6xCzNvZa0XXiOrTzXTxjOIwOxDPWl5khdMyFDBUAhbqdZJd9gra-t'}
      break
    // 回复语音消息
    case '3':
      data = {msgType: 'voice', mediaId: 'aMbetVTejyRiCcbs6FXzvAQCaQrq87SExz9zx8gfabGx6FOzM1sby7GMiIfqShy2'}
      break
    // 回复视频消息
    case '4':
      data = {msgType: 'video', mediaId: '5zH2M32DZ85PKQDzJEOl1uMi6Rogxo0uPasQ0s-i8Q9I8cNWtnNm25mV4fARZKxL', title: '精彩的视频', description: '精彩的视频的描述'}
      break
    // 回复音乐消息
    case '5':
      data = {msgType: 'music', title: '胜似天籁', description: '美妙绝伦的音乐', musicURL: 'aMbetVTejyRiCcbs6FXzvAQCaQrq87SExz9zx8gfabGx6FOzM1sby7GMiIfqShy2', hQMusicUrl: 'aMbetVTejyRiCcbs6FXzvAQCaQrq87SExz9zx8gfabGx6FOzM1sby7GMiIfqShy2', thumbMediaId: 'L6mDCOI6FVP6xCzNvZa0XXiOrTzXTxjOIwOxDPWl5khdMyFDBUAhbqdZJd9gra-t'}
      break
    // 回复图文消息
    case '6':
      data = {
        msgType: 'news',
        articleCount: 2,
        articles: [
          {title: '上叠福路口', description: '上叠福路口', picUrl: 'http://47.106.77.181/static/images/img.jpg', url: 'https://www.baidu.com'},
          {title: '开始的减肥收快递费', description: '萨达', picUrl: 'http://47.106.77.181/static/images/img.jpg', url: 'http://es6.ruanyifeng.com'}
        ]
      }
      break
  }

  const replyXML = createMsgXml(msgData, data)
  console.log(replyXML)

  return replyXML
}