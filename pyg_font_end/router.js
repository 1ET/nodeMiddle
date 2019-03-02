const express = require('express')
const router = express.Router()
const homeControllers = require('./controllers/home')
const listControllers = require('./controllers/list')
const itemControllers = require('./controllers/item')

router.get('/', homeControllers.index)
router.get('/like', homeControllers.like)
router.get('/list/:id', listControllers.index)
router.get('/search', listControllers.search)
router.get('/item/:id', itemControllers.index)

module.exports = router