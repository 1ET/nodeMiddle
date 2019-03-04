const express = require('express')
const router = express.Router()
const homeControllers = require('./controllers/home')
const listControllers = require('./controllers/list')
const itemControllers = require('./controllers/item')
const shopCartitemControllers = require('./controllers/cart')

router.get('/', homeControllers.index)
router.get('/like', homeControllers.like)
router.get('/list/:id', listControllers.index)
router.get('/search', listControllers.search)
router.get('/item/:id', itemControllers.index)
router.get('/cart/add', shopCartitemControllers.addCart)
router.get('/cart/addCartSuccess', shopCartitemControllers.addCartSuccess)
router.get('/cart',shopCartitemControllers.index)
router.get('/cart/list',shopCartitemControllers.list)
router.post('/cart/edit',shopCartitemControllers.edit)

module.exports = router