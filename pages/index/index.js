// 引入发送请求的方法
import {request} from '../../request/index'
//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航数组
    catesList:[],
    // 楼层数据
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },
  // 获取轮播图数据的方法
  getSwiperList(){
    request({url:"/home/swiperdata"})
      .then(result=>{
        this.setData({
                swiperList: result
              })
      })
  },
  // 获取分类导航数据的方法
  getCateList(){
    request({url:"/home/catitems"})
      .then(result=>{
        this.setData({
                catesList: result
              })
      })
  },
  // 获取楼层数据的方法
 async getFloorList(){
    const floorList = await request({url:"/home/floordata"})
    const new_floorList = floorList.map(v=>{
      return {...v,product_list:v.product_list.map(v1=>{
        return {...v1, navigator_url:v1.navigator_url.replace('?','/index?')}
      })}
    })
    this.setData({
      floorList: new_floorList
    })
    
  }
});