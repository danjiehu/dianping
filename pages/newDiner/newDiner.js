// pages/newDiner/newDiner.js
Page({

  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  // my own functions starts below 

  uploadImage: function(e) {
    console.log("uploadImage",e)
  },

  formSubmit: function(e) {
    console.log("formSubmit",e)
    let restaurants = new wx.BaaS.TableObject('restaurants_dhu')

    let newRes = restaurants.create()
    newRes.set({
      "name": e.detail.value.resName,
      "description": e.detail.value.resDescription
    })

    newRes.save().then(
      (res) => {
        wx.showToast({
          title: 'success!',
        })
      }
    )
  },


})