const path = require('path')
const fs = require('fs')
const fsUitls = require('../../common/utils/fsUtils')
const dateUtils = require('../../common/utils/dateUtils')
const config = require('../../config')

const logRootDir = path.join(config.projectRootDir, 'w_logs')

function resolve(filename) {
  return path.join(logRootDir, filename + '.log.txt')
}

async function log(msg) {
  const filename = dateUtils.formate(new Date(), 'yyyyMMdd')
  const fPath = resolve(filename)

  if (!fs.existsSync(logRootDir)) {
    fs.mkdirSync(logRootDir)
  }

  msg = `${dateUtils.formate(new Date(), 'yyyy-MM-dd hh:mm:ss')}  ${msg}`
  let text = !fs.existsSync(fPath)
    ? msg
    : await fsUitls.readFile(fPath) + '\n' + msg

  fsUitls.writeFile(fPath, text)
}

module.exports = {log}
