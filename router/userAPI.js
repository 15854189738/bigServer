/**
 * 创建路由模块
 * 默认：1、导入express模块
 *      2、创建路由对象
 *      3、共享出去，供外接使用
 *      4、
 *  */
//导入express模块
const express = require('express');
//创建路由对象
const router = express.Router();
const userhandler = require('../router_handler/user')
router.post('/reguser', userhandler.regUser)
router.post('/login', userhandler.login)

//共享出去，供外接使用
module.exports = router;