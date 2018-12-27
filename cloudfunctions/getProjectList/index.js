// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext() 
  let { data = [] } = await db.collection('projects').where({
    _openid: OPENID
  }).get()
  let arr = []
  data.forEach(item => {
    let {_id} = item
    arr.push(db.collection('todos').where({
      _openid: OPENID,
      projectId: _id
    }).get())
  })
  let result = await Promise.all(arr)
  result = result.map((item, index) => {
    item.projectName = data[index].name
    item.projectId = data[index]._id
    return item
  })
  return result
}