const db = require('../db/index')
exports.regUser = (req, res) => {

  // 获取客户端传输的数据
  const userinfo = req.body
  //判断用户名和密码是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: '用户名密码不能为空'
    })
  }
  //查询用户名是否被占用
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, (err, results) => {
    console.log(results);
    //检测用户名是否被占用
    if (results.length > 0) {
      return res.send({
        status: 1,
        message: '用户名已占用'
      })
    }
    // 定义待执行的 SQL 语句
    const sqlStr = 'insert into ev_users set ?'
    db.query(sqlStr, {
      username: userinfo.username,
      password: userinfo.password
    }, function (err, results) {

      // 执行 SQL 语句失败 
      if (err) return res.send(err.message)
      // 注册成功
      res.send({
        status: 0,
        message: '注册成功！'
      })
    })
  })
}
exports.login = (req, res) => {
  res.send('post list')
}