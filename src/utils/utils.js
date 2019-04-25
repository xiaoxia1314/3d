export default {
  // 数组转为字符串，以逗号分隔
  changeArrayToString (param) {
    var result = ''
    for (var i = 0; i < param.length; i++) {
      if (i == 0) {
        result = param[i]
      } else {
        result = result + ',' + param[i]
      }
    }
    return result
  },
  // 字符串转为数组，以逗号分隔
  changeStringToArray (param) {
    if (param == null || param == '') {
      return []
    } else {
      return param.split(',')
    }
  }
}
