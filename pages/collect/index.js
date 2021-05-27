// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"商品收藏",
        isActive: true
      },
      {
        id:1,
        value:"品牌收藏",
        isActive: false
      },
      {
        id:2,
        value:"店铺收藏",
        isActive: false
      },
      {
        id:3,
        value:"品牌足迹",
        isActive: false
      }
    ],
    collect:[]
  },

  onShow(){
    // 从缓存中获取收藏数组collect
    const collect = wx.getStorageSync("collect");
    this.setData({collect})
      
  },

  // 标题的点击事件  从子组件传过来的
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index} = e.detail
    // // 修改原数组
    let {tabs} = this.data
    tabs.forEach((item, i) => item.isActive = index === i);
    this.setData({tabs})
  },

})