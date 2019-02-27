// 定义和首页路由
const settingModel = require('../models/settingModel')
const productModel = require('../models/likes')

exports.index = (req, res, next) => {
    Promise.all([settingModel.getSliders(), productModel.getLike()])
        .then(rest => {
            // 1. 轮播数据获取
            res.locals.sliders = rest[0]
            // 2.猜你喜欢
            res.locals.likes = rest[1]
            res.render('home.html')
        }).catch(err => next(err))
}

exports.like = (req, res, next) => {
    productModel.getLike('products?type=like&limit=6')
        .then(data => res.json({ status: 200, rest: data }))
        .catch(err => res.json({ status: 500, msg: err.message }))
}