// pages/auth/index.js
import {login,getUserProfile} from '../../utils/asyncWx.js'
import {request} from '../../request/index'
Page({
  // 获取用户信息
  async handleGetUserProfile(){
    try {
      let res1 =await getUserProfile()
      // // 1. 获取用户信息
      const {entryptedData, rawData, iv, signature} = res1
      // // 2. 获取小程序登录成功后的code
      let {code} = await login();
      const loginParams = {entryptedData, rawData, iv, signature, code}
      // 3. 发送请求获取token值
      let res =await request({url:"/users/wxlogin", method:"POST",data:loginParams})
      const token = {res}
      // 4. 由于我们不是企业开发  无法从res2获取token值 故为token手动设置值并把token值存到缓存中
      wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
      wx.navigateBack({
        delta: 1 //1表示返回上一层 2表示返回上两层
      });
    } catch (error) {
      console.log(err);
    }
    


  }
})