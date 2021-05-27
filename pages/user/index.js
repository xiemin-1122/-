// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      // 未登录时的默认状态
      avatarUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=379468916,1801700363&fm=26&gp=0.jpg",
      nickName:"获取微信头像和昵称"
    },
    collectNums:0
  },
  onShow(){
    const collect = wx.getStorageSync("collect")||[];
    this.setData({collectNums:collect.length})
      
  },
  // 授权登录事件
  getUserProfile(){
    wx.getUserProfile({
      desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const {userInfo} = res;
        this.setData({userInfo})
      }
    })
  },
  

  
})