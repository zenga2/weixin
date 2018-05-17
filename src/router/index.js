const weChatAction = require('../action/weChat')
const loginAction = require('../action/login')
const queryJsApiConfigDataAction = require('../action/queryJsApiConfigData')
const queryStaticResourcesAction = require('../action/queryStaticResources')

module.exports = {
  '/': weChatAction,
  '/api/login': loginAction,
  '/api/queryJsApiConfigData': queryJsApiConfigDataAction,
  '/static/*': queryStaticResourcesAction,
}