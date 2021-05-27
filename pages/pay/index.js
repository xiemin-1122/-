// pages/cart/index.js
/* 
1. 页面加载
  从缓存中取checked为true的商品信息
2. 微信支付
  企业账号 且 企业账号的小程序后台中必须给开发者添上白名单
3. 支付按钮
  1 判断缓存中有没有token
  2 没有就跳转到授权页面进行获取token
  3 有->进行支付操作
*/
  import {showToast, requestPayment} from '../../utils/asyncWx.js'
  import {request} from '../../request/index.js'
  Page({
    data:{
      address:{},
      cart:[],
      totalPrice: 0,
      totalNum: 0
    },
    onShow(){
      // 1. 获取缓存中的地址信息
      const address = wx.getStorageSync("address");
      // 2. 获取缓存中的购物车数组 
      let cart = wx.getStorageSync("cart") || [];
      // 过滤后的购物车数组
      cart = cart.filter(v=>v.checked)
      let totalPrice = 0;
      let totalNum = 0;
      cart.forEach(v => {
          totalPrice += v.num * v.goods_price
          totalNum += v.num
      });
      this.setData({ cart,totalPrice,totalNum, address})
    },
    
    // 设置购物车状态 重新计算底部工具栏数据
    setCart(cart){
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
    // 点击支付功能
    async handleOrderPay(){
      try {
        // 1. 判断缓存中有没有token
      const token = wx.getStorageSync("token");
      // 2. 判断
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return
      }
      // 3.创建订单 生成订单编号
      // 3.1 创建订单需要的参数header order_price consignee_addr goods
      const header= {Authorization:token}
      const {totalPrice, address} = this.data
      const {cart} = this.data
      let goods=[]
      cart.forEach(v=>goods.push({goods_id: v.goods_id,goods_number:v.num,goods_price:v.goods_price}))
      const OrderParams = {order_price: String(totalPrice), consignee_addr: String(address),goods}
      // 3.2 发送创建订单请求 获取订单编号
      const {order_number} = await request({url:"/my/orders/create", method:"POST", header,data:OrderParams})
      // 4. 获取支付参数
      const {pay} =await request({url:"/my/orders/req_unifiedorder",method:"POST", header,data:{order_number}})
      // 5. 发起微信支付--不支持微信支付功能喔
    //  await requestPayment(pay)
      // 6. 查询订单状态
      const res = await request({url:"/my/orders/chkOrder",method:"POST",data:{order_number}})
      await showToast("支付成功")
      // 7. 删除已经支付了的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v=>!v.checked)
      wx.setStorageSync("cart", newCart);
      // 8. 最后跳转到订单页面
      wx.navigateTo({
              url: '/pages/order/index?type=1'
            });
      } catch (error) {
        await showToast("支付失败")
        console.log(error);
      }
    }
    
    

    
  
  })