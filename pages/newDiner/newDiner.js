// pages/newDiner/newDiner.js
const app = getApp()

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    imagePath: null
  },

  // when click upload image, choose image and store file to image data
  uploadImage: function(e) {
    let page = this
    console.log("uploadImage",e)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log("chooseImage",res)
        const tempFilePath = res.tempFilePaths[0]
        page.setData({
          imagePath: tempFilePath
        })
      }
    })
    
  },

  formSubmit: function(e) {
    let page = this
    let File = new wx.BaaS.File()
    let fileParams = {filePath: page.data.imagePath}
    let metaData = {categoryName: 'restaurants_dhu'}

    File.upload(fileParams, metaData).then(res => {
      console.log("uploadsuccess", res)
      let baaSPath = res.data.file
    },
      err => {console.log("uploaderr",err)}
    )
    
    console.log("formSubmit",e)
    let restaurants = new wx.BaaS.TableObject('restaurants_dhu')
    let newRes = restaurants.create()
  
    newRes.set({
      "name": e.detail.value.resName,
      "description": e.detail.value.resDescription,
      "img": baaSPath
    })

    newRes.save().then(
      (res) => {
        wx.showToast({
          title: 'upload success!',
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    )
  }

})