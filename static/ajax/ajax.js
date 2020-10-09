const HOSTURL = "https://322b074517.eicp.vip/user"
export const ajax = async (params) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...params,
      url: HOSTURL + params.url,
      success: (res)=>{
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}