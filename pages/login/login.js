// pages/login/login.js

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: wx.getStorageSync('userInfo')
  },

  // IMPORTANT: Dylan's async log-in exmaple
  // onLoad: async function () {
  //   const userInfo = await this.fetchUser();
  //   app.globalData.userInfo = userInfo;
  //   this.setData({userInfo})
  //   console.log("pageuserdata",this.data.userInfo)
  //   console.log("globaluserdata",app.globalData.userInfo)
  // },

  userInfoHandler: function (data) {
    let page = this
    wx.BaaS.auth.loginWithWechat(data).then(
      (res) => {
        console.log("res",res)
        page.setData({
          userInfo: res
        })
        wx.setStorageSync('userInfo', res)
        // getApp().globalData.userInfo = res
      }
    )
  },
  goDinerProfile: function(){
    wx.navigateTo({
      url: '/pages/dinerProfile/dinerProfile?rid=605c8e3cbc331f354be15be5',
    })
  }
  
})