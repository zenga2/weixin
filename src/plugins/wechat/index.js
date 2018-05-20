const axios = require('axios')
const sha1 = require('sha1')
const fs = require('fs')
const request = require('request-promise-native')
const config = require('../../config/index')
const {objToString, resolvePath} = require('../../utils/utils')
const {loadJsonData, updateJsonData} = require('../localdata/index')

const filename = 'wechat.json'

async function getAccessToken() {
  let {accessToken, accessTokenExpires} = await loadJsonData(filename)
  const now = +new Date()

  // 不存在accessToken，或已经失效，就向微信服务请求接口
  if (!accessToken || accessTokenExpires < now) {
    const {access_token, expires_in} = await queryAccessToken()
    accessToken = access_token
    // 提前五分钟重新请求
    accessTokenExpires = (+new Date()) + (expires_in - 300) * 1000
    await updateJsonData({accessToken, accessTokenExpires}, filename)
  }

  return accessToken
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

async function getJsApiConfigData(url) {
  const jsapi_ticket = await getJsApiTicket()
  const noncestr = createNonceStr()
  const timestamp = createTimestamp()
  url = url.split('#')[0]

  const checkStr = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
  const signature = sha1(checkStr)

  return {noncestr, timestamp, signature}
}

async function getJsApiTicket() {
  let {jsApiTicket, jsApiTicketExpires} = await loadJsonData(filename)
  const now = +new Date()

  if (!jsApiTicket || jsApiTicketExpires < now) {
    const {ticket, expires_in} = await queryJsApiTicket()
    jsApiTicket = ticket
    jsApiTicketExpires = (+new Date()) + (expires_in - 300) * 1000
    await updateJsonData({jsApiTicket, jsApiTicketExpires}, filename)
  }

  return jsApiTicket
}

async function queryJsApiTicket() {
  const access_token = await getAccessToken()
  const {data} = await axios.request({
    url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    method: 'get',
    params: {
      access_token,
      type: 'jsapi'
    }
  })

  if (!data.ticket) {
    throw new Error(`从微信获取JsApiTicket不成功: ${objToString(data)}`)
  }

  return data
}

// 生成随机字符串
function createNonceStr(strLen = 20) {
  const code_0 = 48
  const code_9 = 57
  const code_A = 65
  const code_Z = 90
  const code_a = 97
  const code_z = 122
  const codeArr = []

  while (codeArr.length < strLen) {
    const code = Math.floor(Math.random() * 123)
    if (code_0 <= code && code <= code_9
      || code_A <= code && code <= code_Z
      || code_a <= code && code <= code_z
    ) codeArr.push(code)
  }

  return String.fromCharCode(...codeArr)
}

// 生成时间戳字符串
function createTimestamp() {
  return Math.round((+new Date()) / 1000) + ''
}

async function upload(type, path) {
  const result = await request.post({
    url: 'https://api.weixin.qq.com/cgi-bin/media/upload',
    formData: {
      access_token: await getAccessToken(),
      type,
      media: fs.createReadStream(resolvePath(path))
    }
  })

  if (!result.media_id) {
    throw new Error(`向微信上传素材不成功: ${objToString(result)}`)
  }

  return result.media_id
}

module.exports = {
  getAccessToken,
  getJsApiConfigData,
  upload
}