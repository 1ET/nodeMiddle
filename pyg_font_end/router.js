const express = require('express')
const router = express.Router()
const homeControllers = require('./controllers/home')
const listControllers = require('./controllers/list')
router.get('/',homeControllers.index)
router.get('/like',homeControllers.like)
router.get('/list/:id',listControllers.index)

module.exports = router