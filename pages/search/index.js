// pages/search/index.js
/* 
1. 给输入框绑定 值改变事件 input事件
2. 防抖（防止抖动） 定时器 节流
  防抖： 一般在输入框中 防止重复输入 重复发送请求
  节流： 一般是用于在页面中上拉/下拉


*/
import {request} from '../../request/index'
Page({
  data:{
    goods:[],
    isFocus:false,//判断输入框是否获得焦点 取消按钮是否显示
    inpValue:""
  },
  TimeId:-1,
  // 输入框值改变 触发的事件
 handleInput(e){
    // 1. 获取输入框中的值  
    const {value} = e.detail;
    // 2. 检查合法性
    if(!value.trim()){
      // 隐藏"显示”按钮
      this.setData({isFocus:false,goods:[]})
      // 不合法
      return;
    }
    // 显示"取消"按钮
    this.setData({isFocus: true})
    // 3. 准备发送请求获取数据
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qSearch(value)
    }, 1000)
    
  },
  // 发送商品搜索请求
  async qSearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    this.setData({goods: res})
  },
  // 点击取消按钮事件
  handleCancel(){
    this.setData({inpValue:"",goods:[],isFocus:false})
  },
})