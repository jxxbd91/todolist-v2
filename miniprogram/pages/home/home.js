// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    cardList: [
      {
        no: 0,
        date: '今天',
        query: 0
      },
      {
        no: 0,
        date: '将来',
        query: 1
      },
      {
        no: 0,
        date: '本周',
        query: 2
      },
      {
        no: 0,
        date: '记录',
        query: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.getUserInfo({
      success(res) {
        let { userInfo } = res
        _this.setData({
          userInfo: userInfo
        })
      }
    })

    this.getInitList()
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
   * 通过云函数获取数据条数
   */
  getInitList () {
    wx.cloud.callFunction({
      name: 'getIndexList'
    }).then(res => {
      let { result = [] } = res
      console.log(result)
      this.setData({
        'cardList[0].no': result[0] ? result[0].total : 0,
        'cardList[1].no': result[1] ? result[1].total : 0,
        'cardList[2].no': result[2] ? result[2].total : 0,
        'cardList[3].no': result[3] ? result[3].total : 0
      })
    }).catch(err => {
      console.log(err)
    })
  }
})