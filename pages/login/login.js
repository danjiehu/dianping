// pages/login/login.js

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: wx.getStorageSync('userInfo')
  },

  /**
   * Lifecycle function--Called when page load
   */
  fetchUser: function() {
    return wx.BaaS.auth.getCurrentUser();
  },

  onLoad: async function () {
    // wx.BaaS.auth.getCurrentUser().then(
    //   (res) => {
    //     getApp().globalData.userInfo = 
    //   }
    const userInfo = await this.fetchUser();
    app.globalData.userInfo = userInfo;
    this.setData({userInfo})
    console.log("pageuserdata",this.data.userInfo)
    console.log("globaluserdata",app.globalData.userInfo)
  },

  userInfoHandler: function (data) {
    let page = this
    wx.BaaS.auth.loginWithWechat(data).then(
      (res) => {
        console.log("res",res)
        page.setData({
          userInfo: res
        })
        wx.setStorageSync('userInfo', res)
        getApp().globalData.userInfo = res
      },
      (err) => {

      }
    )
  },
  goDinerProfile: function(){
    wx.navigateTo({
      url: '/pages/dinerProfile/dinerProfile?rid=605c8e3cbc331f354be15be5',
    })
  }
  
})