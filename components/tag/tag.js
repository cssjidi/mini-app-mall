// components/tag/tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tags: {
      type: Array
    },
    activeClass: {
      type: String
    },
    currentType:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    openType: 'navigate'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent('cateevent', {id})
    }
  }
})
