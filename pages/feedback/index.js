// pages/feedback/index.js
/* 
1. 点击+ 触发点击事件选择图片
2. 点击删除图片
3. 点击“提交”
*/

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive: true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive: false
      }
    ],
    //选中的图片路径的数组
    chooseImgs:[],
    // 文本域的内容
    textVal:""
  },

  // 图片上传完成之后的外网的链接数组
  UploadImgs:[],

  // 标题的点击事件  从子组件传过来的
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index} = e.detail
    // // 修改原数组
    let {tabs} = this.data
    tabs.forEach((item, i) => item.isActive = index === i);
    this.setData({tabs})
  },

  // 点击+号选择图片
  handleChooseImg(){
    // 使用小程序内置api选择图片
    wx.chooseImage({
      count: 9,//同时选中的图片的最大数量
      sizeType: ['original', 'compressed'],//图片的格式  原图 压缩
      sourceType: ['album', 'camera'],//图片的来源： 相册 相机
      success: (result) => {
        // 对图片数组进行拼接
        this.setData({chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]})
      }
    });
  },
  
  // 点击删除图片事件
  handleRemoveImg(e){
    // 1. 获取所点击图片的索引
    const {index} = e.currentTarget.dataset
    // 2. 获取选择的图片的数组
    let {chooseImgs} = this.data
    // 3. 从选择的图片数组中删除点击删除的图片的地址链接
    chooseImgs.splice(index,1)
    // 4. 保存选择的图片数组
    this.setData({chooseImgs})
  },

  // 文本域的输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })

  },
  
  // 点击提交事件
  handleFormSubmit(){
    // 1. 获取文本域的内容
    const {textVal,chooseImgs} = this.data
    // 2. 合法性验证
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        mask: true
      });
      return;
    }
    // 判断有无图片需要上传
    if(chooseImgs.length != 0){
      // 3. 准备上传图片到专门的图片服务器
    // 注意：上传文件的api不能上传多个图片，一次只能上传一张 因此需要遍历图片数组 依次上传 上传完毕需要维护图片数组 存放图片上传后的外网链接
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        url: 'https://img.coolcr.cn/api/upload',//上传到哪里
        filePath: v,//被上传的图片的路径
        name: "image",//被上传的图片的名称 后台来获取文件  file
        formData: {},//额外的文本信息
        success: (result)=>{
          let url=JSON.parse(result.data).data.url;
          console.log(url);
          this.UploadImgs.push(url)
          // 4. 所有图片都上传完毕把文本的内容和图片提交到后台中  目前只做前端模拟
          if(i === chooseImgs.length - 1){
            wx.hideLoading();
            console.log("把文本的内容和图片提交到后台中");
            wx.showToast({
              title: '提交成功',
              icon: 'success'
            });
              
            // 重置页面
            this.setData({
              textVal:"",
              chooseImgs:[]
            })
            // 返回上一页
            wx.navigateBack({
              delta: 1
            });
              
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    })
    }
    else{
      
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      wx.hideLoading();
      console.log("把文本的内容和图片提交到后台中");
      // 重置页面
      this.setData({
        textVal:"",
        chooseImgs:[]
      })
      // 返回上一页
      wx.navigateBack({
        delta: 1
      });
    }
  }
})