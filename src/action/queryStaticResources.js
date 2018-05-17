const fs = require('fs')
const {resolvePath} = require('../utils/utils')
const {getStat} = require('../utils/fsUtils')

module.exports = async (request, response) => {
  const fPath = resolvePath(request.path)

  try {
    const stats = await getStat(fPath)
    if (stats.isFile()) {
      response.type = 'text/html;charset=utf-8'
      response.body = fs.createReadStream(fPath)
      return
    }
  } catch (e) {}

  response.status = 404
}
