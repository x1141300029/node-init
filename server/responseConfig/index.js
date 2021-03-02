'use script'
/**
 * 路由支持
 * @author SHADOW
 * @date 2020-03-06
 * @type { Object }
 */
module.exports = {

  /**
   * 跨域支持
   * @param res response
   */
  cors: function(res) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS') // 允许的 http 请求的方法
    res.header('Access-Control-Allow-Headers', '*')
  },

  /**
   * 认证校验
   * @param req
   * @param res
   */
  authValidate: function(req, res) {
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    const token = req.headers['auth-token']
    if (!token || token !== global.AUTH_TOKEN) {
      res.status(403).send(Object.assign({ message: 'token错误' }, global.CONSTANTS.ERROR))
      return false
    }
    return true
  },

  /**
   * quick success response function
   * @param data return data object
   */
  success: function(data) {
    return Object.assign({ data: data }, global.CONSTANTS.SUCCESS)
  },

  /**
   * quick error response function
   * @param err error message
   */
  error: function(err) {
    return Object.assign({ message: err }, global.CONSTANTS.ERROR)
  },

  /**
   * Content-Type
   * @param name 名称
   */
  contentType: function(name) {
    const type = name.replace(/.+\./, '')
    switch (type) {
      case 'jpeg' : return 'image/jpeg'
      case 'jpg' : return 'image/jpg'
      case 'png' : return 'image/png'
      case 'gif' : return 'image/gif'
    }
  }
}
