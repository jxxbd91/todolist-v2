// components/home/card/card.js
const { dateFormat } = require('../../../common/utils.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardItem: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    titles: [dateFormat({}), '已完成', '本周', '记录']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
