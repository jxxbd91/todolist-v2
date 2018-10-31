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
          {
            id: 1,
            content: '小项目一',
            type: 'important'
          },
          {
            id: 2,
            content: '小项目二',
            type: 'emergency'
          }
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
    }
  }
})
