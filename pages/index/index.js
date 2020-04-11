//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scrollHeight: getApp().globalData.scrollHeight - 48,
    tags:[],
    searchLabel: '../../image/menu.png',
    motto: 'Young Menu',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    defaultSize: 'small',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    year: '',
    month: '',
    day: '',
    menus: [],
    todayCategory: [],
    todayMenu:[],
    todayImg: '',
    todayImgId: ''
  },
  //点击右上角分享
  onShareAppMessage(){
    return {
      title: 'swiper',
      path: 'page',
    }
  },
  onSearch:function(){
    let _t = this;
    wx.request({
      url: app.globalData.globalUrl + "/getTagList", 
      data:{
        keyword: '',
        paneNum:1,
        pageSize: 10
      },
      method: 'GET',
      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },
      success:function(res){
      }
    })
  },
  //页面加载
  onLoad: function () {
    var timeStamp = Date.parse(new Date());
    var date = new Date(timeStamp);
    var year1 = date.getFullYear();
    var month1 = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
    var day1 = date.getDate() < 10 ? date.getDate() : date.getDate();
    this.setData({
      month: month1,
      day: day1
    })
    //标签
    let _t = this;
    wx.request({
      url: app.globalData.globalUrl + "/getTagList",
      data: {
        keyword: '',
        pageNum: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var list = res.data.data.list;
        _t.setData({
          tags: list
        })
      }
    })
    //今日编辑精选
    wx.request({
      url: app.globalData.globalUrl + "/getCategoryList",
      data: {
        keyword: '每日推荐',
        pageNum: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var list = res.data.data.list;
        var category_id = list[0]._id
        _t.setData({
          todayCategory: list,
        })
        wx.request({
          url: app.globalData.globalUrl + "/getArticleList",
          data: {
            keyword: '每日推荐',
            pageNum: 1,
            pageSize: 10,
            likes: "true",
            state: 1,
            tag_id: '',
            category_id: category_id,
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            var todayMenu = res.data.data.list;
            var todayImg = res.data.data.list[0].img_url;
            var todayImgId = res.data.data.list[0]._id;
            _t.setData({
              todayMenu: todayMenu,
              todayImg: todayImg,
              todayImgId: todayImgId
            })
          }
        })
      }
    })
    //菜谱
    wx.request({
      url: app.globalData.globalUrl + "/getArticleList",
      data: {
        keyword: '',
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
        var list = res.data.data.list;
        _t.setData({
          menus: list
        })
      }
    })
  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
})
