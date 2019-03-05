const express = require('express')
const router = express.Router()
const homeControllers = require('./controllers/home')
const listControllers = require('./controllers/list')
const itemControllers = require('./controllers/item')
const shopCartitemControllers = require('./controllers/cart')
const loginControllers = require('./controllers/login')
const orderControllers = require('./controllers/order')
const middlewares = require('./middlewave')


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

// 订单
router.get('/checkout', middlewares.checkLogin, orderControllers.checkout)
module.exports = router