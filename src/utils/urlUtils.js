const {isEmptyObj} = require('./typeUtils')
const {each} = require('./utils')

// 将url中的查询参数解析成对象
function urlParse(url) {
  url = url || window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.slice(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      obj[key] = decodeURIComponent((tempArr[1]))
    })
  }

  return obj
}

// 将对象转为表单请求字符串
function serialize(obj) {
  let str = ''

  each(obj, function (val, key) {
    if (val !== undefined) {
      str += `${key}=${val}&`
    }
  })

  return str && str.slice(0, -1)
}

// 把数据拼接到URL上
function addDataToUrl(url, data) {
  if (data && !isEmptyObj(data)) {
    let str = serialize(data)
    if (url.indexOf('?') === -1) {
      url += '?' + str
    } else {
      url += '&' + str
    }
  }

  return url
}

module.exports = {urlParse, serialize, addDataToUrl}
