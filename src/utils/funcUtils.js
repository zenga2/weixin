const {each} = require('./utils')
const {includes} = require('./arrayUtils')

function curry(fn, thisArg) {
  let len = fn.length

  let _curry = function () {
    let args = Array.from(arguments)

    if (args.length >= len) {
      return fn.apply(thisArg, args)
    }

    return function () {
      let arr = args.concat(Array.from(arguments))
      return _curry.apply(null, arr)
    }
  }

  return _curry
}

function pipe() {
  let fnArr = Array.from(arguments)
  return arg => fnArr.reduce((target, fn) => fn(target), arg)
}

const prop = curry((prop, obj) => obj[prop])

const mapObjIndexed = curry((fn, obj) => {
  let result = {}
  each(obj, (val, key) => {
    result[key] = fn(val, key, obj)
  })
  return result
})

const pick = curry((props, obj) =>
  props.reduce((result, prop) => {
    result[prop] = obj[prop]
    return result
  }, {})
)

const pickBy = curry((pred, obj) => {
  const result = {}
  each(obj, (val, key) => {
    pred(val, key, obj) && (result[key] = val)
  })
  return result
})

const initObjBy = curry(
  (fn, props) => props.reduce(
    (target, prop) => {
      target[prop] = fn(prop)
      return target
    },
    {}
  )
)

const merge = curry((second, first) => Object.assign({}, first, second))

const deleteProps = curry((props, obj) =>
  pickBy((val, prop) => !includes(prop, props), obj)
)

const keys = obj => Object.keys(obj)

const values = obj => keys(obj).map(prop => obj[prop])

const filter = curry((pred, arr) => arr.filter(pred))

const map = curry((pred, arr) => arr.map(pred))

const reduce = curry((fn, arr) => arr.reduce(fn))

const take = curry((len, arr) => arr.slice(0, len))

const takeLast = curry((len, arr) => arr.slice(-len))

const groupBy = curry(
  (fn, arr) => arr.reduce((result, item) => {
    const key = fn(item)
    result[key] = result[key] || []
    result[key].push(item)
    return result
  }, {})
)

const arrToMap = curry(
  (prop, arr) => arr.reduce((result, item) => {
    result[item[prop]] = item
    return result
  }, {})
)

const always = arg => () => arg

const identity = arg => arg

module.exports = {
  curry, prop, pipe,
  map, filter, take, takeLast, reduce,
  mapObjIndexed, pick, pickBy, keys, values, initObjBy, merge, deleteProps,
  always, identity, groupBy, arrToMap
}
