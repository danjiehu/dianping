// pages/dinerProfile/dinerProfile.js
let app = getApp()


// start of page object
Page({
 
  // start of page data
  data: {
    pageUser: wx.getStorageSync('userInfo'),
    pageRestaurant:{},
    pageResId: "",
    pageReviews:[],
    inputValue: null,

    orderTotal: null,
    pageOrder: [],

    pageMeals: [],
    latitude: null,
    longitude: null,
    markers: [{
      iconPath: "/images/marker.png",
      id: 0,
      latitude: null,
      longitude: null,
      width: 28,
      height: 40,
      callout: { 
        content: "",
        fontSize: 15, 
        color: "#000000", 
        padding: 1
      }
    }]
  },
  // end of page data


  // start of goToOrder 
  goToOrder: function(e){
    console.log("goToOder",e)
  },
  // end of goToOrder



  // start of onload function
  onLoad: function (event) { 
    let page = this
 
    // onload, get and set page restaurant id to page data for later use
    console.log("onload", event)
    console.log("onloadrid", event.rid) 
    page.setData({
      pageResId: event.rid
    })

    // onload, get clicked restaurant's profile data (restaurants_dhu table) from iFanr and store it to page data
    let restaurants = new wx.BaaS.TableObject("restaurants_dhu")
    restaurants.get(event.rid).then(
      (res) => {
        console.log("clicked diner profile whole", res)
        page.setData({pageRestaurant: res.data})
        page.setData({
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          markers: [{
            iconPath: "/images/marker.png",
            id: 0,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            width: 28,
            height: 40,
            callout: { 
              content: res.data.address,
              fontSize: 15, 
              color: "#000000", 
              padding: 1
            }
          }]
        })
      }
    )

    // onload, get clicked restaurants meals data
    // save table object to a parameter box "meals"
    let meals = new wx.BaaS.TableObject("meals_dhu")
    // defining query
    let findMeals = new wx.BaaS.Query()
    findMeals.compare("restaurant_id","=",event.rid)
    // IMPORTANT: function cannot read this.pageResId in time, here you can only use event.rid
    // fish qualified meals out of "meals" tabel object use the query just defined
    meals.setQuery(findMeals).find().then(
      res => {
        console.log("meals",res)
        page.setData({
          pageMeals: res.data.objects
        })
      }
    )


    // onload, get clicked restaurants reivews data
    // define a query to find reviews that match the restaurant id
    // store matching reviews to page data
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
  },
  // end of onload function



  //start of defining goLogin function
  goLogin: function(){
    wx.switchTab({
      url: '/pages/login/login'
    })
  },
  //end of defining goLogin function




  // start of defining submit review function
    //if user submit new review
    //step ONE: create new Review information and save to iFanr
    //step TWO: iFanr will give save status response, wait for server response
    //step THREE: once saved to server ok, push response data to page review array (reset page data)
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

        // console.log("test",res)
        let reviewArray = this.data.pageReviews
        // console.log("1",this.data.pageReviews)
        reviewArray.push(res.data)
        // console.log("2",this.data.pageReviews)

        this.setData({
          pageReviews: reviewArray
        })
      },

    )
  },
  // end of defining submit review function




  // start of clear input function
  clearInputEvent: function(res) {
    this.setData({
      'inputValue': ''
    })
  },
  // end of clear input function




  // NOT COMPLETE: start of defining click on map - go to venue function
  goToVenue: function (res) {
    console.log("tapping map",res)
    wx.showToast({
      title: 'Feature Coming Soon',
    })
  },
  // NOT COMPLETE: end of go to venue function


  // start of defining increaseCount
  increaseCount: function(e){
    
    console.log("test",e.currentTarget.dataset.meal_id)

    let page = this
    let pageOrder = page.data.pageOrder
    let orderMap = new pageOrder.map(i => [i.key, i.val])
    orderMap.set({
      id: 1,
      count: 1
    })
    console.log("orderMap",orderMap)

    // if (orderMealType < 1) {
    //   page.setData({
    //     pageOrder:[{
    //       "meal_id": e.currentTarget.dataset.meal_id,
    //       "meal_count": 1
    //     }]
    //   })
    // }
    



    // mealCount = this.data

    // console.log("increaseCount",e)
    
    // let count = function(){
    //   mealCount = mealCount + 1
    //   return mealCount
    // }
    
  } 
  // end of defining increaseCount




// end of page object
})


