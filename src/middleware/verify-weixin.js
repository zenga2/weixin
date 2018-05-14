const sha1 = require('sha1')
const token = 'zengjunweixin'

module.exports = () => async (ctx, next) => {
  const {request, response} = ctx
  const {signature, timestamp, nonce, echostr} = request.query

  console.log(request.path)

  if (signature && timestamp && nonce && echostr) {
    const str = [token, timestamp, nonce].sort().join('')
    const strAfterSha1 = sha1(str)
    if (strAfterSha1 === echostr) {
      response.body = echostr
    } else {
      response.status = 403
    }
  } else {
    await next()
  }
}