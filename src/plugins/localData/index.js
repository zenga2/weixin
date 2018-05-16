const fs = require('fs')
const path = require('path')
const fsUtils = require('../../utils/fsUtils')
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

// 如果先data = await loadJsonData, 然后修改data，同时中间进行了异步操作
// 最后saveJsonData(data)。这种情况可能会出现原文件已被其他函数修改的问题
// 原因是中间的异步操作把执行权让给了其他函数
// 如果其他函数正好修改了原文件，可能会出现非预期的结果
async function saveJsonData(data, filename) {
  const fPath = path.join(dataRootDir, filename)
  await fsUtils.writeFile(fPath, JSON.stringify(data))
}

// 注意是浅拷贝
async function updateJsonDate(updateData, filename) {
  const newData = Object.assign(await loadJsonData(filename), updateData)
  await saveJsonData(newData, filename)
}

module.exports = {
  loadJsonData, saveJsonData, updateJsonDate
}