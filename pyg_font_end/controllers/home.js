// 定义和首页路由
const settingModel = require('../models/settingModel')

exports.index = (req, res, next) => {
    /*1. 轮播数据获取*/
    settingModel.getSliders().then(data => {
        //挂载数据
        res.locals.sliders = data
        // res.json(res.locals)
        res.render('home.html')
    }).catch(err => next(err))
}