module.exports = opts => {
  const pathArr = Object.keys(opts)

  return async (ctx) => {
    const {request, response} = ctx
    const currPath = normalizePath(request.path)

    for (const pathTpl of pathArr) {
      if (isMatchPath(currPath, pathTpl)) {
        return await opts[pathTpl](request, response, ctx)
      }
    }

    response.status = 404
  }
}

// '*' is used for fuzzy matching, only allowed at the end of the path
// '*' Matches zero or multiple path element
// e.g. /df/*  match  /df, /df/sdf, /df/sdf/sdf/sd
function isMatchPath(currPath, pathTpl) {
  if (currPath === pathTpl || pathTpl === '/*') return true

  if (pathTpl.endsWith('/*')) {
    pathTpl = pathTpl.slice(0, -2)
    return currPath === pathTpl || currPath.startsWith(pathTpl + '/')
  }

  return false
}

function normalizePath(path) {
  // if there are two or more  '/' side by side, keep only one
  path = path.replace(/\/{2,}/g, '/')

  // if currPath(exclude root path) ends with '/', delete the '/'
  const len = path.length
  if (len > 1 && path[len - 1] === '/') {
    path = path.slice(0, -1)
  }

  return path
}
