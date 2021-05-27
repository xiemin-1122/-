// 同时发送异步代码的次数
let ajaxTime = 0;
export const request = (pamas) => {
    ajaxTime++;
    // 显示加载中 效果
    wx.showLoading({
        title: '加载中',
        mark: true
        });
    // 定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...pamas,
            url: baseUrl+pamas.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err)
            },
            complete:() => {
                ajaxTime--;
                if(ajaxTime === 0){
                    // 关闭加载中的图标
                    wx.hideLoading();
                }
            }
        })
    })
}