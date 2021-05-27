

//Promise形式的getSetting
export const getSetting=() => {
    return new Promise((resolve, reject)=>{
        wx.getSetting({
            success:(result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })   
}

//Promise形式的chooseAddress
export const chooseAddress=() => {
    return new Promise((resolve, reject)=>{
        wx.chooseAddress({
            success:(result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })   
}

//Promise形式的openSetting
export const openSetting=() => {
    return new Promise((resolve, reject)=>{
        wx.openSetting({
            success:(result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })   
}
//Promise形式的showModal
export const showModal=(content) => {
    return new Promise((resolve, reject)=>{
        wx.showModal({
            title:'提示',
            content:content,
            success:(result) => {
                resolve(result)
            },
            fail:(err) => {
                reject(err)
            }
        })
    })   
}
//Promise形式的showToast
export const showToast=(title) => {
    return new Promise((resolve, reject)=>{
        wx.showToast({
            title:title,
            icon:'none',
            success:(result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })   
}

//Promise形式的login
export const login=() => {
    return new Promise((resolve, reject)=>{
        wx.login({
            success:(result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })   
}
//Promise形式的getUserProfile
export const getUserProfile=() => {
    return new Promise((resolve, reject)=>{
        wx.getUserProfile({
            desc:"获取用户信息",
            success:(result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })   
}
//Promise形式的requestPayment
export const requestPayment=(pay) => {
    return new Promise((resolve, reject)=>{
        wx.requestPayment({
            ...pay,
            success:(result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })   
}

//Promise形式的uploadFile
export const uploadFile=() => {
    return new Promise((resolve, reject)=>{
        wx.uploadFile({
            url: '',
            filePath:'' ,
            name:'' ,
            formData: {},
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })   
}

//Promise形式的chooseImage
export const chooseImage=() => {
    return new Promise((resolve, reject)=>{
        wx.chooseImage({
            count: 9,
            sizeType: ['original','compressed'],
            sourceType: ['album','camera'],
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    })   
}

