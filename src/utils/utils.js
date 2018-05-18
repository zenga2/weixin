const path = require('path')
const {isArrayLike} = require('./typeUtils')
const config = require('../config')

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

function objToString(query) {
  return Object.keys(query).reduce((result, prop) => {
    return `${result} ${prop}=${query[prop]},`
  }, 'param:').slice(0, -1)
}

function resolvePath(...subPaths) {
  return path.join(config.projectRootDir, ...subPaths)
}

function promisify(obj, prop) {
  return (...args) => new Promise((resolve, reject) => {
    obj[prop](...args, (err, result) => {
      if (err) reject(err)

      resolve(result)
    })
  })
}

module.exports = {
  each,
  objToString,
  resolvePath,
  promisify
}
