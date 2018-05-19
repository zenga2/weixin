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
      data = {msgType: 'image', mediaId: ''}
      break
    // 回复语音消息
    case '3':
      data = {msgType: 'voice', mediaId: ''}
      break
    // 回复视频消息
    case '4':
      data = {msgType: 'video', mediaId: '', title: '精彩的视频', description: '精彩的视频的描述'}
      break
    // 回复音乐消息
    case '5':
      data = {msgType: 'music', title: '胜似天籁', description: '美妙绝伦的音乐', musicURL: '', hQMusicUrl: '', thumbMediaId: ''}
      break
    // 回复图文消息
    case '6':
      data = {
        msgType: 'news',
        articleCount: 2,
        articles: [
          {title: '上叠福路口', description: '上叠福路口', picUrl: 'http://47.106.77.181/static/images/img.jpg', url: ''},
          {title: '', description: '', picUrl: '', url: ''}
        ]
      }
      break
  }

  return createMsgXml(msgData, data)
}