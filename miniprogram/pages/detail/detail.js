// miniprogram/pages/detail/detail.js
const { dateFormat } = require('../../common/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    todoInfo: {},
    doneFlag: false,
    db: null,
    completeTime: '',
    createTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id = ''} = options
    this.setData({
      id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.db = wx.cloud.database()
    this.pageInit()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 初始化
   * 获取指定id todos的详情
   */
  pageInit () {
    if (!this.data.id) return
    this.data.db.collection('todos').where({
      _id: this.data.id
    }).get()
    .then(res => {
      console.log(res)
      this.setData({
        todoInfo: res.data[0],
        doneFlag: res.data[0].done,
        completeTime: dateFormat({ date: res.data[0].completedDate }),
        createTime: dateFormat({date: res.data[0].createTime})
      })
    })
    .catch(err => {
      console.log(err)
    })
  },

  /**
   * 完成响应
   */
  completedHandle (ev) {
    let {target: {dataset: {finish}}} = ev
    this.data.db.collection('todos')
      .doc(this.data.id)
      .update({
        data: {
          done: finish
        }
      })
      .then(res => {
        console.log(res)
        this.setData({
          doneFlag: finish
        }) 
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * 编辑响应
   */
  editHandle () {
    wx.navigateTo({
      url: '/pages/add/add?id=' + this.data.id,
    })
  }
})