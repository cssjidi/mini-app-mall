//login.js
//获取应用实例
const app = getApp()
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    source: [
      {
        icon: 'https:///api.xwfshop.com/images/icons/fill.png',
        title: '我的收藏',
        link: '/pages/favorite/index'
      },
      {
        icon: 'https:///api.xwfshop.com/images/icons/fill.png',
        title: '我的返利',
        link: '/pages/favorite/index'
      }
    ]
  },
  goToIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    app.getUserInfo((userInfo) => {
      console.log(userInfo)
      this.setData({
        userInfo: userInfo
      })
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: e.detail.url
    })
  },
  onReady () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange((res) => {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
})