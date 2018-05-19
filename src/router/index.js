const weChatAction = require('../action/weChat')
const loginAction = require('../action/login')
const queryAccessTokenAction = require('../action/query-access-token')
const queryJsApiConfigDataAction = require('../action/query-js-api-config-data')
const queryStaticResourcesAction = require('../action/query-static-resources')

module.exports = {
  '/': weChatAction,
  '/api/login': loginAction,
  '/api/queryAccessToken': queryAccessTokenAction,
  '/api/queryJsApiConfigData': queryJsApiConfigDataAction,
  '/static/*': queryStaticResourcesAction
}