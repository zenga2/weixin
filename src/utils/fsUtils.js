const fs = require('fs')
const {promisify} = require('./utils')

function readFileAsync(path, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err)

      resolve(data)
    })
  })
}

function writeFileAsync(path, data, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, encoding, (err) => {
      if (err) reject(err)

      resolve()
    })
  })
}

const getStat = promisify(fs, 'stat')

module.exports = {
  readFileAsync, writeFileAsync,
  getStat
}
