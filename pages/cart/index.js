// pages/cart/index.js
/* 
1. 获取用户的收获地址
2. 页面加载完毕
  1 获取本地存储中的地址数据
  2 把数据设置给data中的一个变量 
3. onShow: 获取缓存中的购物车数组 并填充到data中
   在商品详情页面时 添加缓存时候  加入了num和checked两个数据
4. 全选的实现 数据的展示
5. 总价格和总数量
6. 商品选中事件
7. 全选和反选
8. 商品数量编辑
9. 没有商品的状态提示
10. 商品结算功能：
  判断有无选中商品
  判断有无收货地址*/
import {showModal, showToast} from '../../utils/asyncWx.js'
Page({
  data:{
    address:{},
    cart:[],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow(){
    // 1. 获取缓存中的地址信息
    const address = wx.getStorageSync("address");
    // 2. 获取缓存中的购物车数组 
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart)
    this.setData({address})
  },
  // 点击添加收货地址
  async handleChooseAddress(){
    // 获取收货地址
    wx.chooseAddress({
      success:(result) => {
        // 存入到缓存中
        wx.setStorageSync("address", result);
          
      }
  })
      
  },
  // 商品选中
  handleItemChange(e){
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    // 找到被修改的商品
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    // 重新设置data和缓存数据
    this.setCart(cart)
  },
  // 设置购物车状态 重新计算底部工具栏数据
  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }else{
        allChecked = false
      }
    });
    allChecked = cart.length!=0?allChecked:false
    this.setData({ cart, allChecked,totalPrice,totalNum})
    wx.setStorageSync("cart", cart)
  },
  // 商品的全选和反选功能
  handleItemAllChecked(){
    let {cart, allChecked} = this.data
    allChecked = !allChecked;
    cart.forEach(v=>v.checked = allChecked);
    this.setCart(cart)
  },
  // 商品数量的编辑 +1 -1
  async handleItemNumEdit(e){
    // 获取传递过来的参数
    let {id, oper} = e.currentTarget.dataset;
    // 获取购物车数组
    let {cart} = this.data
    // 找到需要修改数量的商品索引值
    const index = cart.findIndex(v=>v.goods_id===id);
    // 当购物车数量为1 询问用户是否删除
    if(cart[index].num === 1 && oper===-1){
      // 弹窗提示
      const res = await showModal('确定要删除该商品吗？')
      if(res.confirm){
        cart.splice(index, 1);
        this.setCart(cart)
      }     
    }else{
      // 修改商品的数量
      cart[index].num += oper
      // 重新设置data和缓存中的cart数据
      this.setCart(cart)
    }
    
  },
 async handlePay(){
    // 1. 判断有无收货地址
    const {address, totalNum} = this.data;
    if(!address.userName){
      await showToast("您还没有选择收货地址")
      return
    }
    if(!totalNum){
      await showToast("您还没有选购商品")
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }

})