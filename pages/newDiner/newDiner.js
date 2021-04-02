// pages/newDiner/newDiner.js
const app = getApp()

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    imagePath: null,
    selectedAddress: null,
    resLat: null,
    resLong: null
  },

  // choosing image, store image path to page data
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
  // end of storing image path to page data

   // defining function: when focus on location input, open map
   chooseLocation: function(){
    let page = this
    wx.chooseLocation({
      success: function(res) {
        console.log("chooseLocation",res)
        page.setData({
          selectedAddress: res.address,
          resLat: res.latitude,
          resLong: res.longitude
        })
      }
    })
  },
  // end of defining choose location function



  //defining form submitfuntion
  //when submitting form, upload image first, in success response create new res in iFanr
  formSubmit: function(e) {
    console.log("formSubmit",e)

    //setting up all parameters
    let page = this
    let File = new wx.BaaS.File()
      let fileParams = {filePath: page.data.imagePath}
      let metaData = {categoryName: 'restaurants_dhu'}
    let restaurants = new wx.BaaS.TableObject('restaurants_dhu')
    let newRes = restaurants.create()
    
    //start of uploading image
    //start of creating a restaurant

    if (page.data.imagePath) {
      File.upload(fileParams, metaData).then(res => {
      
        console.log("uploadsuccess", res)
        let baaSFile = res.data.file
        //when upload success, the use what's in the res to create new restaurant
  
        //start of creating new restaurant
        //setting what's in the restaurant
        newRes.set({
        "name": e.detail.value.resName,
        "description": e.detail.value.resDescription,
        "img": baaSFile,
        "address": page.selectedAddress,
        "latitude": page.resLat,
        "longitude": page.resLong
      })
  
      //save new restaurant info with image
      newRes.save().then(
        (res) => {
          console.log("upload success with image"),
          wx.showToast({
            title: 'upload success!',
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      )
  
      })
    } else {
      newRes.set({
        "name": e.detail.value.resName,
        "description": e.detail.value.resDescription,
        "address": page.selectedAddress,
        "latitude": page.resLat,
        "longitude": page.resLong
      })
  
      //save new restaurant info without image
      newRes.save().then(
        (res) => {
          console.log("upload success without image")
          wx.showToast({
            title: 'upload success!',
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
        })
    }
    
  
  
  }
  ,
    //end of creating a restaurant


  //end of form submit function

 
})