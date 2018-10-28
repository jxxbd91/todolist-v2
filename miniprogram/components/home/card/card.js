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
    titles: [dateFormat({}), dateFormat({ date: Date.now() + 24 * 60 * 60 * 1000 }), '本周', '记录']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
