const app = getApp()
Page({
  data: {
    array: [1,2,3,4]
  },

  clickMe: function () {
    this.setData({ clickme: "欢迎！" })
  }
})
