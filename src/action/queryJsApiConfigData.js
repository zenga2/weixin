const {getJsApiConfigData} = require('../plugins/wechat')

module.exports = async (request, response) => {
  response.body = await getJsApiConfigData(request.query.url)
}