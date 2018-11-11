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
    originProjects: [],
    pickerVal: '',
    projectInput: false,
    compValue: '',
    submitData: {
      level: 0,
      project: '',
      projectId: '',
      title: '',
      destription: '',
      done: false
    },
    initProjectId: '',
    DB: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      initProjectId: options.projectId || '',
      'submitData.projectId': options.projectId || '',
      'submitData.project': options.projectName || ''
    })
    this.data.DB = wx.cloud.database()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getProjectList()
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
   * 获取项目列表
   */
  getProjectList () {
    let _this = this
    this.data.DB.collection('projects')
      .get({
        success (res) {
          let { data } = res
          console.log(data)
          let pro = data.map(item => item.name)
          let ids = data.map(item => item._id)
          let picker = ids.indexOf(_this.data.initProjectId)
          pro.push('其他')
          _this.setData({
            originProjects: data,
            projects: pro
          })
          if (picker > -1) {
            _this.setData({
              pickerVal: picker
            })
          }
        }
      })
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
      projectInput: this.data.projects[value] === '其他',
      'submitData.projectId': value < (this.data.projects.length - 1) ? this.data.originProjects[value]._id:''
    })
    console.log(this.data.submitData)
  },

  titleHandle (e) {
    this.setData({
      'submitData.title': e.detail.value
    })
  },

  compChangeHandle (e) {
    let {detail: {value}} = e
    this.setData({
      compValue: value
    })
  },

  destriptionHandle (e) {
    this.setData({
      'submitData.destription': e.detail.value
    })
  },

  addHandle (e) {
    let _this = this
    if (!this.data.submitData.projectId) {
      this.createProj(this.data.DB, this.data.submitData.project)
        .then(res => {
          let { _id } = res
          let params = JSON.parse(JSON.stringify(this.data.submitData))
          params.projectId = _id
          params.createTime = new Date().getTime()
          params.completeDate = new Date(this.data.compValue).getTime()
          this.data.DB.collection('todos')
            .add({
              data: params,
              success(res) {
                _this.addSuccess()                
              }
            })
        })
        .catch(err => {
        })
    } else {
      let params = JSON.parse(JSON.stringify(this.data.submitData))
      params.createTime = new Date().getTime()
      params.completeDate = new Date(this.data.compValue).getTime()
      this.data.DB.collection('todos')
        .add({
          data: params,
          success(res) {
            _this.addSuccess()
          }
        })
    }
  },

  proInputHandle (e) {
    this.setData({
      'submitData.project': e.detail.value
    })
  },

  createProj (DB, project) {
    return new Promise((resolve, reject) => {
      DB.collection('projects')
        .add({
          data: {
            name: project
          },
          success(res) {
            console.log(res)
            resolve(res)
          },
          error (err) {
            console.log(err)
            reject(err)
          }
        })
    })
  },

  /**
   * 添加成功
   */
  addSuccess () {
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })
    setTimeout(() => {
      wx.hideToast({
        success () {
          wx.navigateTo({
            url: '/pages/home/home',
          })
        }
      })
    }, 1000)
  }
})