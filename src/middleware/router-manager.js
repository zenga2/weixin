module.exports = opts => {
  const keys = Object.keys(opts)

  return async ({request, response}) => {
    const path = request.path

    if (!keys.includes(path)) {
      response.status = 404
    } else {
      await opts[path](request, response)
    }
  }
}