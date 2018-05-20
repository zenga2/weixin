const createMsgXml = require('./create-msg-xml')
const {upload} = require('../../plugins/wechat')

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
      data = {msgType: 'image', image: {mediaId: await upload('image', 'static/img.jpg')}}
      break
    // 回复语音消息
    case '3':
      data = {msgType: 'voice', voice: {mediaId: await upload('voice', 'static/music.mp3')}}
      break
    // 回复视频消息
    case '4':
      data = {
        msgType: 'video',
        video: {
          mediaId: await upload('video', 'static/video.mp4'),
          title: '精彩的视频', description: '精彩的视频的描述'
        }
      }
      break
    // 回复音乐消息
    case '5':
      data = {
        msgType: 'music',
        music: {
          title: '胜似天籁',
          description: '美妙绝伦的音乐',
          musicUrl: 'http://47.106.77.181/static/music.mp3',
          hQMusicUrl: 'http://47.106.77.181/static/music.mp3',
          thumbMediaId: await upload('image', 'static/img.jpg')
        }
      }
      break
    // 回复图文消息
    case '6':
      data = {
        msgType: 'news',
        articleCount: 2,
        articles: [
          {title: '上叠福路口', description: '上叠福路口', picUrl: 'http://47.106.77.181/static/img.jpg', url: 'https://www.baidu.com'},
          {title: '开始的减肥收快递费', description: '萨达', picUrl: 'http://47.106.77.181/static/img.jpg', url: 'http://es6.ruanyifeng.com'}
        ]
      }
      break
  }

  const replyXML = createMsgXml(msgData, data)
  console.log(replyXML)

  return replyXML
}