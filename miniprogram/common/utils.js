/**
 * utils
 */
// 数据类型判断
const Utils = (() => {
  const getType = obj => {
    let datatype = Object.prototype.toString.call(obj)
    switch(datatype) {
      case '[object Object]':
        return 'object'
      case '[object Array]':
        return 'array'
      case '[object String]':
        return 'string'
      case '[object Number]':
        return 'number'
      case '[object Boolean]':
        return 'boolean'
      case '[object Date]':
        return 'date'
      case '[object Function]':
        return 'function'
      case '[object Null]':
        return 'null'
      case '[object Undefined]':
        return 'undefined'
      case '[object RegExp]':
        return 'regexp'
    }

  }

  return {
    isObject (obj) {
      return getType(obj) === 'object'
    },
    isArray (obj) {
      return getType(obj) === 'array'
    },
    isFunction (obj) {
      return getType(obj) === 'function'
    },
    isString(obj) {
      return getType(obj) === 'string'
    },
    isNumber(obj) {
      return getType(obj) === 'number'
    },
    isNull(obj) {
      return getType(obj) === 'null'
    },
    isUndefined(obj) {
      return getType(obj) === 'undefined'
    },
    isBoolean(obj) {
      return getType(obj) === 'boolean'
    },
    isDate(obj) {
      return getType(obj) === 'date'
    },
    isRegexp(obj) {
      return getType(obj) === 'regexp'
    }
  }
})()


// 时间转换
const dateFormat = ({date, type = 'yyyy年mm月dd day'}) => {
  if (Utils.isUndefined(date) || Utils.isNull(date)) {
    date = new Date()
  } else {
    date = new Date(date)
  }
  const dayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + ' ' + dayMap[date.getDay()]
}

exports.Utils = Utils
exports.dateFormat = dateFormat