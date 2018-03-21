//index.js
//获取应用实例
import { observer } from '../../libs/observer.js'
import ProductStore from '../../mobx/ProductStore.js';
import { fetch } from '../../utils/fetch'
const app = getApp()
Page(observer({
  data:{
    word: '',
    active: false,
  },
  props: {
    productStore: ProductStore,
  },
  onLoad() {
  },
  onFocus() {
    this.setData({
      active: true,
    })
  },
  onBlur() {
    this.setData({
      active: false,
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: "/pages/detail/index?id=" + e.detail.id
    })
    this.props.productStore.setProductId(e.detail.id)
  },
  onChange(e) {
    this.setData({
      word: e.detail.value
    })
  },
  onSearch(e) {
    const { fetchSearch } =  this.props.productStore
    fetchSearch(this.data.word)
  }
}))