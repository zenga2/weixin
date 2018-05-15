const axios = require('axios')
const config = require('../../config')
const {objToString} = require('../utils')
const {loadJsonData, saveJsonDate} = require('../../plugins/localData')

const filename = 'wechat.json'

async function getAccessToken() {
  let data = await loadJsonData(filename)
  const now = +new Date()

  // 不存在accessToken，或已经失效，就向微信服务请求接口
  if (!data.accessToken || data.expires < now) {
    const weChatData = await queryAccessToken()
    data.accessToken = weChatData.access_token
    // 提前五分钟重新请求
    data.expires = (+new Date()) + (weChatData.expires_in - 300) * 1000
    // 保存数据
    saveJsonDate(data, filename)
  }

  return data.accessToken
}

async function queryAccessToken() {
  const {data} = await axios.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    method: 'get',
    params: {
      grant_type: 'client_credential',
      appid: config.weixin.appID,
      secret: config.weixin.appSecret
    }
  })

  if (!data.access_token) {
    throw new Error(`从微信获取AccessToken不成功: ${objToString(data)}`)
  }

  return data
}

module.exports = {
  getAccessToken
}