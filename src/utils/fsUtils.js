const fs = require('fs')

function readFile(path, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err)

      resolve(data)
    })
  })
}

function writeFile(path, data, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, encoding, (err) => {
      if (err) reject(err)

      resolve()
    })
  })
}


module.exports = {readFile, writeFile}
