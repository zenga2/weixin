const {padLeft} = require('./stringUtils')

// fmt eg: 'yyyy-MM-dd hh:mm:ss'
function formate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let matchStr
  let obj = {
    '(M+)': date.getMonth() + 1,
    '(d+)': date.getDate(),
    '(h+)': date.getHours(),
    '(m+)': date.getMinutes(),
    '(s+)': date.getSeconds()
  }

  if (/(y+)/.test(fmt)) {
    matchStr = RegExp.$1
    fmt = fmt.replace(matchStr, String(date.getFullYear()).slice(4 - matchStr.length))
  }

  for (let k in obj) {
    if (new RegExp(k).test(fmt)) {
      matchStr = RegExp.$1
      let val = String(obj[k])
      // 当匹配模式中的M|d|h|m|s为单个的话，则相应的值左边不补零
      val = matchStr.length === 1 ? val : padLeft(val, '0', 2)
      fmt = fmt.replace(matchStr, val)
    }
  }

  return fmt
}

// 注意年份只支持4位的
function parse(dataStr, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (dataStr.length !== fmt.length) {
    throw new Error('日期的格式错误')
  }

  let obj = {
    '(y+)': 'setFullYear',
    '(M+)': 'setMonth',
    '(d+)': 'setDate',
    '(h+)': 'setHours',
    '(m+)': 'setMinutes',
    '(s+)': 'setSeconds'
  }
  let d = new Date()
  let value, method, startIndex, endIndex, matchStr

  for (let k in obj) {
    if (new RegExp(k).test(fmt)) {
      matchStr = RegExp.$1
      startIndex = fmt.indexOf(matchStr)
      endIndex = startIndex + matchStr.length
      value = parseInt(dataStr.slice(startIndex, endIndex), 10)

      if (k === '(M+)') {
        value -= 1
      }

      if (!isNaN(value)) {
        method = obj[k]
        d[method](value)
      }
    }
  }

  return d
}

// 计算两个时刻之间的时长
function calculateDuration(startTime, endTime) {
  if (typeof startTime === 'string') {
    startTime = parse(startTime)
  }

  if (typeof endTime === 'string') {
    endTime = parse(endTime)
  }

  return Number(endTime) - Number(startTime)
}

function msToStr(msNum) {
  let strArr = []
  let opts = [
    {tMode: 24 * 3600 * 1000, text: '天'},
    {tMode: 3600 * 1000, text: '小时'},
    {tMode: 60 * 1000, text: '分'},
    {tMode: 1000, text: '秒'}
  ]

  opts.forEach(({tMode, text}) => {
    let t = Math.floor(msNum / tMode)

    if (t > 0) {
      strArr.push(t + text)
    }

    msNum = msNum % tMode
  })

  return strArr.join('')
}

function modifyDate(date, opStr) {
  date = new Date(date)

  let arr = opStr.match(/^([-+]?\d+)([yMdhms])/)
  let propMap = {
    y: 'FullYear',
    M: 'Month',
    d: 'Date',
    h: 'Hours',
    m: 'Minutes',
    s: 'Seconds'
  }

  if (arr) {
    let num = Number(arr[1])
    let unitStr = arr[2]
    let prop = propMap[unitStr]

    // modify date
    date['set' + prop](date['get' + prop]() + num)
  }

  return date
}

function isLeapYear(year) {
  year = Number(year)

  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

module.exports = {
  formate, modifyDate, parse,
  calculateDuration, msToStr, isLeapYear
}
