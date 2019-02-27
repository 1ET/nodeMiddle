const express = require('express')
const router = express.Router()
const homeControllers = require('./controllers/home')
router.get('/',homeControllers.index)
router.get('/like',homeControllers.like)

module.exports = router