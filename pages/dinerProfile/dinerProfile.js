// pages/dinerProfile/dinerProfile.js
let app = getApp()

Page({

  data: {
    pageUser: app.globalData.userInfo,
    pageRestaurant:{},
    pageReviews:[],
    inputValue: null
  },

  onLoad: function (event) { 
    
    let page = this
    page.setData({
      pageUser: app.globalData.userInfo
    })

    console.log("onload", event)
    console.log("onloadrif", event.rid) 
    let restaurants = new wx.BaaS.TableObject("restaurants_dhu")
    restaurants.get(event.rid).then(
      (res) => {
        console.log("now", res)
        page.setData({pageRestaurant: res.data})
      }
    )

    let reviews = new wx.BaaS.TableObject("reviews_dhu")
    let findReviews = new wx.BaaS.Query()
    findReviews.compare('restaurant', '=', event.rid)
    reviews.setQuery(findReviews).find().then(
      (res) => {
        console.log("check page reviews",res)
        page.setData({
          pageReviews: res.data.objects
        })
      }
    )
    
    // Restaurant.setQuery(newQuery).find(res).then(
    //   page.setData({pageReviews: res})
    // )

    // let newReview = review.create();
    // newReview.set({

    // })
  
  },

  goLogin: function(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  submitReview: function(e) {
    let page = this
    console.log("submit",e)
    let reviews = new wx.BaaS.TableObject("reviews_dhu")
    let newReview = reviews.create()

    newReview.set({
      content: e.detail.value.reviewContent,
      restaurant: this.data.pageRestaurant.id
    })

    newReview.save().then(
      (res) => {
        let reviewArray = this.data.pageReviews
        console.log("1",this.data.pageReviews)
        reviewArray.push(res.data)
        console.log("2",this.data.pageReviews)
        this.setData({
          pageReviews: reviewArray
        })
      },

     
        

    )
  },

  clearInputEvent: function(res) {
    this.setData({
      'inputValue': ''
    })
  }

   

    
})
