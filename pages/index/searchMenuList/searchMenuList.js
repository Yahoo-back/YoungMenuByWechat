// pages/index/searchMenuList/searchMenuList.js
const app = getApp()
Page({
  data: {
    searchList: [],
    keyword: ''
  },
  //页面加载
  onLoad: function (e) {
    this.setData({
      keyword: e.keyword
    })
    var _t = this;
    wx.request({
      url: app.globalData.globalUrl + "/getArticleList",
      data: {
        keyword: e.keyword,
        pageNum: 1,
        pageSize: 10,
        likes: "true",
        state: 1,
        tag_id: '',
        category_id: '',
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
       var searchList = res.data.data.list;
        _t.setData({
          searchList: searchList,
        })
      }
    })
  }

})