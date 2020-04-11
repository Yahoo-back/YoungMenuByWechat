//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    motto: '菜谱详情',
    keyword: '',
    likes: '',
    state: '',
    category_id: '',
    img_url: '',
    title: '',
    type: '',
    _id: '',//菜谱id
    views: '',
    likes: '',
    comments: '',
    desc: '',
    author: '',
    create_time: '',
    content: '',
    menuName: ''

  },
  onLoad: function (e) {
    this.setData({
      menuName: e.keyword
    })
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
    let _t = this;
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
        var todayMenu = res.data.data.list;
        var article_id = res.data.data.list[0]._id;
        console.log(article_id)
        _t.setData({
          _id: article_id,
        })
        console.log(_t.data._id)
        //根据菜谱列表_id获取菜谱详情
        wx.request({
          url: app.globalData.globalUrl + "/getArticleDetail",
          data: {
            id: _t.data._id,
            type: 1
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
            var img_url = res.data.data.img_url;
            var title = res.data.data.title;
            var create_time1 = res.data.data.create_time;
            var dateee = new Date(create_time1).toJSON();
            var create_time = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            var content = res.data.data.content;
            let obj = app.towxml(content, 'markdown', {
              theme: 'light',
              events: {
                tap: (e) => {
                  console.log('tap', e);
                }
              }
            });
            _t.setData({
              img_url: img_url,
              title: title,
              likes: likes,
              views: views,
              comments: comments,
              desc: desc,
              author: author,
              create_time: create_time,
              content: obj
            })
          }
        })
      }
    })

  },
  getUserInfo: function (e) {
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