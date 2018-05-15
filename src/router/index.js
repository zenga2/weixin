const weChatAction = require('../action/weChat')
const loginAction = require('../action/login')

module.exports = {
  '/': weChatAction,
  '/login': loginAction
}