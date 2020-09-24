/**
 * 入口文件
 */

//导入express模块
const express = require('express')
//创建 express 的服务器实例
const app = express();

//导入并配置cors 解决跨域问题
const cors = require('cors')
app.use(cors())

//配置解析 application/x-www-form-urlencoded格式的表单数据的中间件
app.use(express.urlencoded({
  extended: false
}))

//导入并使用用户路由模块
const user = require('./router/userAPI')
app.use('/api', user)


//启动服务器
app.listen(80, () => {
  console.log('api server 127.0.0.1');
})