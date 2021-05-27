import {request} from '../../request/index'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧导航栏分类名称
    leftMenuList:[],
  // 商品数据
    rightContent:[],
    // 被点击的左侧的菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部距离
    scrollTop: 0

  },
// 请求分类接口返回的数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 发送请求之前判断本地存储中有没有旧的数据
    // 2. 没有旧数据  直接发请求
    // 3. 有旧数据 同时 旧数据也没有过期 就使用本地存储中的旧数据即可

    // 获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    // p判断
    if(!Cates){
      // 不存在, 发送请求获取数据
      this.getCates();
    }else{
      // 有旧数据 定义过期时间
    if(Date.now() - Cates.time > 1000*10){
      // 旧数据过期 重新请求
      this.getCates()
    }else{
      // 可以使用就数据
      this.Cates = Cates.data;
      // 构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name)
      // 构造右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({leftMenuList,rightContent})
    }
  }
},
  // 获取分类的数据
  async getCates(){
    let result = await request({url:"/categories"})
    this.Cates = result;
    // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", {time:Date.now(), data: this.Cates});
    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    // 构造右侧的商品数据
    let rightContent = this.Cates[0].children;
    this.setData({leftMenuList,rightContent})

  },
  // 左侧菜单点击事件
  handleItemTap(e){
    const{index} = e.currentTarget.dataset;
    // 构造右侧的商品数据
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0})
  }
  
})