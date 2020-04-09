//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    motto: '菜谱详情',
    tag_id: '',
    tag_name: '',
    keyword: '',
    likes: '',
    state: '',
    category_id: '',
    img_url: '',
    title: '',
    type: '',
    _id: '',//菜谱id
    views:'',
    likes: '',
    comments: '',
    desc: '',
    author: '',
    create_time: '',
    content: ''

  },
  onLoad:function(e){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    this.setData({
      tag_id: e.tag_id,
      tag_name: e.tag_name
    })
    let _t = this;
    //根据tag_id标签id获取菜谱列表
    wx.request({
      url: app.globalData.globalUrl + "/getArticleList",
      data: {
        keyword: '',
        paneNum: 1,
        pageSize: 10,
        likes: '',
        state: 1,
        tag_id: e.tag_id,
        category_id: '',
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var list = res.data.data.list;
        var imgUrl = list[0].img_url;
        var title = list[0].title;
        var type = list[0].type;
        var article_id = list[0]._id;
        _t.setData({
          img_url: imgUrl,
          title: title,
          type: type,
          _id: article_id
        })
        //根据菜谱列表_id获取菜谱详情
        wx.request({
          url: app.globalData.globalUrl + "/getArticleDetail",
          data: {
            id: _t.data._id,
            type: _t.data.type,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            var views = res.data.data.meta.views;
            var likes = res.data.data.meta.likes;
            var comments = res.data.data.meta.comments;
            var desc = res.data.data.desc;
            var author = res.data.data.author; 
            var create_time1 = res.data.data.create_time;
            var dateee = new Date(create_time1).toJSON();
            var create_time = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            var content = res.data.data.content;

            _t.setData({
              likes: likes,
              views: views,
              comments: comments,
              desc: desc,
              author: author,
              create_time: create_time,
              content: content
            })
          }
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
 //点击右上角分享
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page',
    }
  },
})
// 