function padLeft(str, padStr, totalLen) {
  while (str.length < totalLen) {
    str = padStr + str
  }

  return str.slice(-totalLen)
}

function padRight(str, padStr, totalLen) {
  while (str.length < totalLen) {
    str += padStr
  }

  return str.slice(0, totalLen)
}

// 把首字母转为大写
function firstLetterToUpperCase(str) {
  return str.replace(/^\w/, function (matchStr) {
    return matchStr.toUpperCase()
  })
}

// 将驼峰格式转为连字符格式
function camelToHyphen(str) {
  return str.replace(/[A-Z]/g, function (matchStr) {
    return '-' + matchStr.toLowerCase()
  })
}

// 将普通字符串转义成正则的格式
function escapeStringRegexp(str) {
  let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g

  if (typeof str !== 'string') {
    throw new TypeError('Expected a string')
  }

  return str.replace(matchOperatorsRe, '\\$&');
}

module.exports = {
  padLeft, padRight, firstLetterToUpperCase,
  camelToHyphen, escapeStringRegexp
}
