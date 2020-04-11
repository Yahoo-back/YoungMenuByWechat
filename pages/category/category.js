const app = getApp()
Page({
  data: {
    hotSearch: [],
    meat: [],
    hotFood: [],
    popular: [],
    dessert: []
  },
  onLoad: function () {
    let _t = this;
    //大家都在搜
    wx.request({
      url: app.globalData.globalUrl + "/getCategoryList",
      data: {
        keyword: '大家都在搜',
        pageNum: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var hotSearch = res.data.data.list;
        _t.setData({
          hotSearch: hotSearch
        })
      }
    })
    //肉类
    wx.request({
      url: app.globalData.globalUrl + "/getCategoryList",
      data: {
        keyword: '肉类',
        pageNum: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var meat = res.data.data.list;
        _t.setData({
          meat: meat
        })
      }
    })
    //热门食材
    wx.request({
      url: app.globalData.globalUrl + "/getCategoryList",
      data: {
        keyword: '热门食材',
        pageNum: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var hotFood = res.data.data.list;
        _t.setData({
          hotFood: hotFood
        })
      }
    })
    //流行学做
    wx.request({
      url: app.globalData.globalUrl + "/getCategoryList",
      data: {
        keyword: '流行学做',
        pageNum: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var popular = res.data.data.list;
        _t.setData({
          popular: popular
        })
      }
    })
    //烘焙
    wx.request({
      url: app.globalData.globalUrl + "/getCategoryList",
      data: {
        keyword: '烘焙',
        pageNum: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var dessert = res.data.data.list;
        _t.setData({
          dessert: dessert
        })
      }
    })
  }
})
