// pages/goods_detail/index.js
/* 
1. 发送请求获取商品详情数据
2. 点击轮播图 预览大图
3. 点击加入购物车事件 
4. 商品收藏*/
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    // 1. 获取商品id 和商品详情信息
    const {goods_id} = pages[pages.length - 1].options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url: "/goods/detail", data:{goods_id}})
    this.GoodsInfo = goodsObj;
    // 1. 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 2. 判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      goodsObj:{
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机不识别webp图片格式 后台若无法修改 自己临时改：.webp => .jpg

        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    })
  },
  // 点击轮播图  放大预览
  handlePreviewImage(e){
    console.log(e);
    // 1 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    // 接收传递过来的图片url
    const {index} = e.currentTarget.dataset
    wx.previewImage({
      current: urls[index],
      urls,
    });
  },
  // 加入购物车点击事件
  handleCartAdd(){
    // 1. 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || []
    // 2. 判断商品对象是否存在购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index === -1){
      // 不存在
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }else{
      // 存在
      cart[index].num++
    }
    // 3. 吧购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 4. 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,//防止用户手抖疯狂点击  当点击1.5s后才能够继续点击
    });   
  },
  // 点击商品收藏图标
  handleCollect(){
    // 1. 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 2. 判断商品是否已经被收藏
    let index = collect.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
    console.log(index);
    // 3. 当index!=-1时，表示商品已经被收藏过了
    if(index != -1){
      collect.splice(index,1)
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else{
      collect.push(this.GoodsInfo)
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4. 将收藏数组存入到缓存中
    wx.setStorageSync("collect", collect);
    this.setData({isCollect:!this.data.isCollect})
    
    
      
  }
  
})