// components/project/item/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    projectData: {
      type: Object,
      value: {
        head: {
          title: ''
        },
        data: [
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hiddenFlag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    rowDownHandle (e) {
      this.setData({
        hiddenFlag: !this.data.hiddenFlag
      })
    },

    /**
     * 页面跳转
     */
    tapHandle (ev) {
      let {target: {dataset: {id}}} = ev
      wx.navigateTo({
        url: '/pages/detail/detail?id='+ id,
      })
    },

    /**
     * 完成
     */
    finishHandle (ev) {
      const db = wx.cloud.database()
      let {target: {dataset: {doneflag, id}}} = ev
      db.collection('todos').doc(id).update({
        data: {
          done: !doneflag
        }
      }).then(res => {
        console.log(res)
        this.triggerEvent('statuschange')
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 根据指定project添加项目
     */
    addWithProjHandle (ev) {
      let {target: {dataset: {projid, name}}} = ev
      wx.navigateTo({
        url: '/pages/add/add?projectId='+projid+'&projectName='+name,
      })
    }
  }
})
