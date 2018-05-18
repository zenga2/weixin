const fs = require('fs')
const path = require('path')
const fsUtils = require('../../utils/fsUtils')
const {resolvePath} = require('../../utils/utils')

const dataRootDir = resolvePath('w_data')

// If the w_data directory does not exist, create it
if (!fs.existsSync(dataRootDir)) {
  fs.mkdirSync(dataRootDir)
}

async function loadJsonData(filename) {
  const fPath = path.join(dataRootDir, filename)
  return !fs.existsSync(fPath)
    ? {}
    : JSON.parse(await fsUtils.readFileAsync(fPath))
}

// 如果先data = await loadJsonData, 然后修改data，同时中间进行了异步操作
// 最后saveJsonData(data)。这种情况可能会出现原文件已被其他函数修改的问题
// 原因是中间的异步操作把执行权让给了其他函数
// 如果其他函数正好修改了原文件，可能会出现非预期的结果
async function saveJsonData(data, filename) {
  const fPath = path.join(dataRootDir, filename)
  await fsUtils.writeFileAsync(fPath, JSON.stringify(data))
}

// Note: not deep copy, just shallow copy
async function updateJsonData(updateData, filename) {
  const newData = Object.assign(await loadJsonData(filename), updateData)
  await saveJsonData(newData, filename)
}

module.exports = {
  loadJsonData, saveJsonData, updateJsonData
}