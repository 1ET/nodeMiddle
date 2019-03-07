const express = require('express')
const router = express.Router()
const homeControllers = require('./controllers/home')
const listControllers = require('./controllers/list')
const itemControllers = require('./controllers/item')
const shopCartitemControllers = require('./controllers/cart')
const loginControllers = require('./controllers/login')
const orderControllers = require('./controllers/order')
const payControllers = require('./controllers/pay')
const middlewares = require('./middlewave')

// 页面数据
router.get('/', homeControllers.index)
router.get('/like', homeControllers.like)
router.get('/list/:id', listControllers.index)
router.get('/search', listControllers.search)
router.get('/item/:id', itemControllers.index)
router.get('/cart/add', shopCartitemControllers.addCart)
router.get('/cart/addCartSuccess', shopCartitemControllers.addCartSuccess)
router.get('/cart', shopCartitemControllers.index)
router.get('/cart/list', shopCartitemControllers.list)
router.post('/cart/edit', shopCartitemControllers.edit)
router.post('/cart/delete', shopCartitemControllers.delete)

// 登录
// 跳转
router.get('/account/login', loginControllers.login)
// 验证
router.post('/account/login', loginControllers.loginLogic)

// 退出
router.get('/logout', loginControllers.index)
// 订单
// 生成订单
router.get('/order/add', middlewares.checkLogin, orderControllers.addOrder)
// 核对单个订单
router.get('/checkout', middlewares.checkLogin, orderControllers.checkoutOrder)
// 查看所有订单
router.get('/myorder', middlewares.checkLogin, orderControllers.myOrder)

// 支付
router.get('/pay', middlewares.checkLogin, payControllers.pay)
router.get('/pay/callback', middlewares.checkLogin, payControllers.callback)


module.exports = router