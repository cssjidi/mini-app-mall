// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lists: {
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent('detailevent', {id})
    },
  }
})
