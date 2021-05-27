/* 
1. onShow{
  1. 获取url上的参数type以及token(缓存中没有token就跳转到授权页面获取)
  2. 根据type值选中tabs里面的标题
  3. 请求头为token并根据type请求生成订单数据
  4. 渲染页面
}
2. 点击不同标题渲染不同页面
*/
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
   data:{
    tabs:[
      {
        id:0,
        value:"全部",
        isActive: true
      },
      {
        id:1,
        value:"待付款",
        isActive: false
      },
      {
        id:2,
        value:"待发货",
        isActive: false
      },
      {
        id:3,
        value:"退款/退货",
        isActive: false
      }
    ],
    ordersList:[]
  },
  onShow(){
    // 1. 获取小程序的页面栈-数组  长度最大是10页面
    // 数组中索引最大的页面就是当前页面 以此来拿url的type参数
    var pages =  getCurrentPages();
    const {type} = pages[pages.length - 1].options
    // 2. 根据type激活选中标题 index = type - 1
    this.changeTitleByIndex(type-1)
    // 3. 判断缓存中有没有token
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    // 4. 获取订单列表
    this.getOrdersList(type,token)
    
  },
  // 获取订单列表
  async getOrdersList(type,token){
    const header={Authorization:token}
    const {orders} = await request({url:"/my/orders/all",header,data:{type}})
    // 将订单列表的创建时间由时间戳改成正确格式并存入到this.data中
    this.setData({ordersList:orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))})
  },
  // 根据标题索引选中标题
  changeTitleByIndex(index){
    // // 修改原数组
    let {tabs} = this.data
    tabs.forEach((item, i) => item.isActive = index === i);
    this.setData({tabs})
  },
  // 标题的点击事件  从子组件传过来的
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index} = e.detail
    this.changeTitleByIndex(index)
    // 重新发送请求 type = index + 1
    this.getOrdersList(index+1)
  },
  
})