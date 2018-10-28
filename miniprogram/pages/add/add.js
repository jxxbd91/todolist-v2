// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levels: [
      '紧急', '重要', '一般', '不重要'
    ],
    projects: [],
    pickerVal: '',
    projectInput: false,
    submitData: {
      level: '',
      project: '',
      projectId: '',
      title: '',
      destription: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.projects.push('其他')
    this.setData({
      projects: this.data.projects
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  radioChange (e) {
    this.setData({
      'submitData.level': e.detail.value
    })
  },

  bindPickerChange (e) {
    let {detail: {value}} = e
    this.setData({
      pickerVal: value,
      projectInput: this.data.projects[value] === '其他'
    })
  },

  titleHandle (e) {
    this.setData({
      'submitData.title': e.detail.value
    })
  },

  destriptionHandle (e) {
    this.setData({
      'submitData.destription': e.detail.value
    })
  },

  addHandle (e) {
    console.log(this.data.submitData)
    const DB = wx.cloud.database()
    DB.collection('todos')
      .add({
        data: this.data.submitData,
        success (res) {
          console.log(res)
        }
      })
  },

  proInputHandle (e) {
    this.setData({
      'submitData.project': e.detail.value
    })
  }
})