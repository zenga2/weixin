const {getAccessToken} = require('../plugins/wechat')

module.exports = async (request, response) => {
  response.body = {
    accessToken: await getAccessToken()
  }
}