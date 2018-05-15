module.exports = opts => {
  const keys = Object.keys(opts)

  return async (ctx) => {
    const {request, response} = ctx
    const path = request.path

    if (!keys.includes(path)) {
      response.status = 404
    } else {
      await opts[path](request, response, ctx)
    }
  }
}