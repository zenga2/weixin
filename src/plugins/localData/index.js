const fs = require('fs')
const path = require('path')
const fsUtils = require('../../common/utils/fsUtils')
const config = require('../../config')

const dataRootDir = path.join(config.projectRootDir, 'w_data')
// 检测w_data目录是否存在, 不存在就创建一个
if (!fs.existsSync(dataRootDir)) {
  fs.mkdirSync(dataRootDir)
}

async function loadJsonData(filename) {
  const fPath = path.join(dataRootDir, filename)
  return !fs.existsSync(fPath)
    ? {}
    : JSON.parse(await fsUtils.readFile(fPath))
}

function saveJsonDate(data, filename) {
  const fPath = path.join(dataRootDir, filename)
  fsUtils.writeFile(fPath, JSON.stringify(data))
}

module.exports = {
  loadJsonData, saveJsonDate
}