/**
 * 创建连接数据库， 向外恭喜db使数据库链接对象
 */

const mysql = require('mysql');

//创建连接数据库
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01',
})
// 向外共享 db 数据库连接对象
module.exports = db