const HOST = "https://api.kele8.cn/agent/https://app.vmovier.com"


const request = function (uri, data, methods) {
  return new Promise((resolve, reject) => {
    if (!data) data = {}
    wx.request({
      method: methods,
      url: HOST + uri,
      data: data,
      success: function (result) {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const get = function (uri, data) {
  return request(uri, data, "GET")
}

const post = function (uri, data) {
  return request(uri, data, "POST")
}
module.exports = {
  request,
  get,
  post
}