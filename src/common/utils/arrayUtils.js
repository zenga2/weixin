function remove(item, arr) {
  let index = arr.indexOf(item)

  if (index > -1) {
    arr.splice(index, 1)
  }
}

function includes(item, arr) {
  return arr.indexOf(item) > -1
}

// 数组去重
function unique(arr) {
  let tmpArr = []
  let item

  for (let i = 0, len = arr.length; i < len; i++) {
    item = arr[i]
    if (tmpArr.indexOf(item) === -1) {
      tmpArr.push(item)
    }
  }

  return tmpArr
}

module.exports = {remove, includes, unique}
