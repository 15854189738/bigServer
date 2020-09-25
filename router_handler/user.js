const db = require('../db/index')
const bcrypt = require('bcryptjs')
//导入生成Token的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')
exports.regUser = (req, res) => {

  // 获取客户端传输的数据
  const userinfo = req.body
  //判断用户名和密码是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.cc('用户名密码不能为空', 1)
  }
  //查询用户名是否被占用
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, (err, results) => {
    console.log(results);
    //检测用户名是否被占用
    if (results.length > 0) {
      return res.cc('用户名已占用', 1)
    }

    //密码加密
    userinfo.password = bcryptjs.hashSync(userinfo.password, 10);
    // 定义待执行的 SQL 语句
    const sqlStr = 'insert into ev_users set ?'
    db.query(sqlStr, {
      username: userinfo.username,
      password: userinfo.password
    }, function (err, results) {

      // 执行 SQL 语句失败 
      if (err) return res.send(err.message)
      // 注册成功
      res.cc('注册成功!', 0);
    })
  })
}
exports.login = (req, res) => {
  //登陆验证用户名、密码数据是否合法
  // 获取客户端传输的数据
  const userinfo = req.body
  //判断用户名和密码是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.cc('用户名密码不能为空', 1)
  }
  //查询用户名和密码是否在数据库中存在
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, (err, results) => {
    if (err) {
      return res.cc(err)
    } else if (results.length !== 1) {
      return res.cc('登陆失败')
    }
    //判断登陆密码和数据库密码是否一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
    if (!compareResult) {
      return res.cc('登陆失败！')
    }
    //登陆成功，生成token字符串
    const user = {
      ...results[0],
      password: '',
      user_pic: 's'
    }
    //对用户信息进行加密，生成Token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn
    })
    res.send({
      status: 0,
      message: "登陆成功！",
      token: 'Bearer ' + tokenStr
    })
  })
}