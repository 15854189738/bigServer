/**
 * 入口文件
 */
//导入express模块
const express = require('express')
//创建 express 的服务器实例
const app = express();
//导入并配置cors 解决跨域问题
const cors = require('cors');
//调用cors方法
app.use(cors())

//配置解析 application/x-www-form-urlencoded格式的表单数据的中间件
app.use(express.urlencoded({
  extended: false
}))
//优化代码 将响应的数据中间件抽取
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      //状态
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next();
})
//导入配置文件
const config = require('./config');
const expressJWT = require('express-jwt')
//token身份认证
app.use(expressJWT({
  secret: config.jwtSecretKey
}).unless({
  path: [/^\/api\//]
}))
//导入并使用用户路由模块
const user = require('./router/userAPI')
app.use('/api', user)
// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  // if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})
//启动服务器
app.listen(80, () => {
  console.log('api server 127.0.0.1');
})