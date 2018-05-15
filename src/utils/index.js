const fsUtils = require('./fsUtils')
const {isArrayLike} = require('./typeUtils')

function each(obj, fn) {
  if (!obj || !fn) return

  if (isArrayLike(obj)) {
    for (let i = 0, len = obj.length; i < len; i++) {
      if (fn.call(obj, obj[i], i) === false) return
    }
  } else {
    let keys = Object.keys(obj)
    for (let i = 0, len = keys.length; i < len; i++) {
      let k = keys[i]
      if (fn.call(obj, obj[k], k) === false) return
    }
  }
}

module.exports = {
  ...fsUtils,
  each
}
