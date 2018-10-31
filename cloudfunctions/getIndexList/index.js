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
  const nowDay = now.getDay()
  const dayS = todayS - nowDay * aDay
  const dayE = todayS + (7 - nowDay) * aDay
  return Promise.all([
    await db.collection('todos').where({
      completeDate: _.gt(todayS).and(_.lt(tomoS))
    }).count(),
    await db.collection('todos').where({
      completeDate: _.gt(tomoS)
    }).count(),
    await db.collection('todos').where({
      completeDate: _.gt(dayS).and(_.lt(dayE))
    }).count(),
    await db.collection('todos').count()
  ])
}