// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    restaurants:[]
  },
  
  onShow() {
    let page = this
    let Restaurant = new wx.BaaS.TableObject("restaurants_dhu")
    Restaurant.find().then(
      (res) => {
        console.log("restaurants",res)
        page.setData({
          restaurants: res.data.objects
        })
      },
      (err) => {

      }

    )

  },
  toDinerProfile: function(e){
    let page = this
    console.log("tapevent",e)
    wx.navigateTo({
      url: `/pages/dinerProfile/dinerProfile?rid=${e.currentTarget.dataset.rid}`,
    })
  }
})
