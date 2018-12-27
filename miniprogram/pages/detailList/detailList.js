// miniprogram/pages/detailList/detailList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: ''
    },
    type: '',
    deLists: [
      []
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'header.title': options.title,
      type: options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getDetailList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetailList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取详情列表
   * 需要根据type进行判断，type共有四种可能值
   * 0 -- 今天
   * 1 -- 已完成
   * 2 -- 本周
   * 3 -- 记录
   */
  getDetailList () {
    const db = wx.cloud.database()
    let condition = this.queryCondition(db.command)
    if (condition) {
      db.collection('todos').where(condition).get().then(res => {
        this.queryServerResult(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      db.collection('todos').get().then(res => {
        this.queryServerResult(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },

  /**
   * 请求条件
   */
  queryCondition(_) {
    const aDay = 24 * 60 * 60 * 1000
    const now = new Date()
    const todayS = new Date(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()).getTime()
    const tomoS = todayS + aDay
    const tomoE = tomoS + aDay
    const nDay = now.getDay()
    const dayS = todayS - nDay * aDay
    const dayE = dayS + 7 * aDay
    switch(this.data.type) {
      case '0':
        return {
          completeDate: _.gte(todayS).and(_.lt(tomoS)),
          done: false
        }
      case '1':
        return {
          done: true
        }
      case '2':
        return {
          completeDate: _.gte(dayS).and(_.lt(dayE)),
          done: false
        }
      case '3':
        return null
    }
  },

  /**
   * 处理请求结果
   * 根据level进行分组，并且根据 createTime 进行升序排列
   */
  queryServerResult (res) {
    let {data = []} = res
    let result = [[], [], [], []]
    data.forEach(item => {
      result[item.level].push(item)
    })
    console.log(result)
    this.setData({
      deLists: result
    })
  }
})