//index.js
//获取应用实例
import { observer } from '../../libs/observer.js'
import ProductStore from '../../mobx/ProductStore.js';
import { fetch } from '../../utils/fetch'
const app = getApp()
Page(observer({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    aspectFit:true,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    top: false,
    cateId: 'nz',
  },
  props:{
    productStore: ProductStore,
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: "/pages/detail/index?id=" + e.detail.id
    })
    this.props.productStore.setProductId(e.detail.id)
  },
  onPageScroll(e) {
    if (e.scrollTop > 145) {
      this.setData({
        top: true,
      })
    }else{
      this.setData({
        top: false,
      })
    }
  },
  onLoad: function () {
    const { setCursor, fetchCate, fetchProducts } = this.props.productStore
    setCursor(this.data.cateId)
    fetchCate()
    fetchProducts(this.data.cateId)
  },
  getCate(e) {
    this.setData({
      cateId: e.detail.id
    })
    this.getProduct()
    const title = this.props.productStore.getTitle.name
    wx.setNavigationBarTitle({title})
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getProduct() {
    const { fetchProducts, paging, setCursor } = this.props.productStore
    setCursor(this.data.cateId)
    ++paging[this.data.cateId].page
    fetchProducts(this.data.cateId)
  },
  onReachBottom(e) {
    this.getProduct()
  },
}))
