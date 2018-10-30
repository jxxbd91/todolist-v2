// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const aDay = 24 * 60 * 60 * 1000
  const now = new Date()
  const todayS = new Date(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()).getTime()
  const tomoS = todayS + aDay
  const tomoE = tomoS + aDay
  return Promise.all([await db.collection('todos').where({
    createTime: _.gt(todayS).and(_.lt(tomoS))
  }).get(), await db.collection('todos').where({
    createTime: _.gt(tomoS).and(_.lt(tomoE))
  }).get()])
}