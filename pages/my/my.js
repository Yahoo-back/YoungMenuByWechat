//index.js
//获取应用实例
var adds = {}
const app = getApp()

Page({
  data: {
    motto: 'Young Menu',
    userInfo: {},
    hasUserInfo: false,
    detailPics: [], //上传的结果图片集合
    count: 9,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  uploadNote:function() {
    wx.navigateTo({
      url: '/pages/my/uploadNote/uploadNote'
    })
  },
 
  uploadDetailImage: function (e) { //这里是选取图片的方法
    var that = this;
    var pics = [];
    var detailPics = that.data.detailPics;
    if (detailPics.length >= that.data.count) {
      wx.showToast({
        title: '最多选择' + that.data.count + '张！',
      })
      return;
    }
    wx.chooseImage({
      count: that.data.count, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgs = res.tempFilePaths;
        for (var i = 0; i < imgs.length; i++) {
          pics.push(imgs[i])
        }
        that.uploadimg({
          url: app.globalData.globalUrl + "/upload", //这里是你图片上传的接口
          path: pics, //这里是选取的图片的地址数组
        });
      },
    })

  },
  uploadimg: function (data) {
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',
      formData: { "userId": "35" },
      success: (resp) => {
        wx.hideLoading();
        success++;
        var str = resp.data //返回的结果，可能不同项目结果不一样

        console.log(str);
        // var pic = JSON.parse(str);
        // var pic_name = that.data.showUrl + pic.Data;
        // var detailPics = that.data.detailPics;
        // detailPics.push(pic_name)
        // that.setData({
        //   detailPics: detailPics
        // })
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;
        if (i == data.path.length) { //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          var myEventDetail = {
            picsList: that.data.detailPics
          } // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);//递归，回调自己
        }
      }
    });
  },
  onLoad: function () {
    //获取微信头像及信息
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickMe: function () {
    this.setData({ clickme: "欢迎！" })
  }
})
