// pages/goods_list/index.js
/*
1. 用户上滑页面 滚动条触底 开始加载下一页数据
  1） 找到滚动条触底事件
  2） 判断还有没有下一页数据
    a. 获取到总页数
    b. 获取当前的页码
  3） 加入没有下一页数据 弹出一个提示
  4） 假如还有下一页数据 加载下一页数据
 */
import {request} from '../../request/index'
Page({
  data:{
    tabs:[
      {
        id:0,
        value:"综合",
        isActive: true
      },
      {
        id:1,
        value:"销量",
        isActive: false
      },
      {
        id:2,
        value:"价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 总页数
  totalPages: 1,
  // 请求商品搜索列表接口需要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  onLoad:function (options){
    this.QueryParams.cid = options.cid || ""
    this.QueryParams.query = options.query||""
    this.getGoodsList()
  },

  // 获取商品列表数据
  async getGoodsList(){
    
    const res = await request({url:"/goods/search", data:this.QueryParams})
    // 获取总条数
    const total = res.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({goodsList: [...this.data.goodsList, ...res.goods]})
    wx.stopPullDownRefresh();
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
  // 页面下拉刷新页面事件 需要在页面的json文件中开启一个配置项:"enablePullDownRefresh": true,"backgroundTextStyle": "dark"
  onPullDownRefresh(){
    this.setData({goodsList:[]})
    this.QueryParams.pagenum=1;
    this.getGoodsList()
    // 数据回来了需要手动关闭等待的loading效果

  },
  // 页面上滑  滚动条触底事件
  onReachBottom(){
    if(this.QueryParams.pagenum >= this.totalPages){
      wx.showToast({
        title: '没有下一页数据了'
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
      
    }
  }
  
})