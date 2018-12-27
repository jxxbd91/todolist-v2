
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext() 
  const aDay = 24 * 60 * 60 * 1000
  const now = new Date()
  const todayS = new Date(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()).getTime() - 1
  const tomoS = todayS + aDay
  const tomoE = tomoS + aDay
  const nDay = now.getDay()
  const dayS = todayS - nDay * aDay
  const dayE = dayS + 7 * aDay
  return Promise.all([
    await db.collection('todos').where({
      _openid: OPENID,
      completeDate: _.gte(todayS).and(_.lt(tomoS)),
      done: false
    }).count(),
    await db.collection('todos').where({
      _openid: OPENID,
      done: true
    }).count(),
    await db.collection('todos').where({
      _openid: OPENID,
      completeDate: _.gte(dayS).and(_.lt(dayE)),
      done: false
    }).count(),
    await db.collection('todos').where({
      _openid: OPENID
    }).count()
  ])

}