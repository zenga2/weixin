const path = require('path')
const fs = require('fs')
const fsUitls = require('../../utils/fsUtils')
const dateUtils = require('../../utils/dateUtils')

function resolve(filename) {
  return path.join(__dirname, '../../../w_logs', filename + '.log.txt')
}

async function log(msg) {
  const filename = dateUtils.formate(new Date(), 'yyyyMMdd')
  const fPath = resolve(filename)

  msg = `${dateUtils.formate(new Date(), 'yyyy-MM-dd hh:mm:ss')}  ${msg}`

  let text = !fs.existsSync(fPath)
    ? msg
    : await fsUitls.readFile(fPath) + '\n' + msg

  fsUitls.writeFile(fPath, text)
}

module.exports = {log}
