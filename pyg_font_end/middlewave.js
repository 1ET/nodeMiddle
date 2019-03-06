const config = require('./configs')
const categoryModel = require('./models/category')
const productModel = require('./models/product')
const cartModel = require('./models/cart')

// 获取配置信息
exports.global = (req, res, next) => {
    res.locals.site = config.site
    res.locals.user = req.session.user
    // 优化加载列表
    if (req.app.locals.Category) {
        res.locals.Category = req.app.locals.Category
        next()
    } else {
        categoryModel.getCategory()
            .then(data => {
                req.app.locals.Category = data
                res.locals.Category = data
                next()
            })
            .catch(err => next(err))
    }

}

// 拦截登录功能
exports.checkLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login?ruturnUrl' + encodeURIComponent(req.url))
    }
    next()
}

// 购物车数据展示
exports.cartHeader = (req, res, next) => {
    if (!req.session.user) {
        cartList = JSON.parse(req.cookies[config.cartCookie.key] || '[]')
        const cartNum = cartList.reduce((prev, item) => prev + parseInt(item.num), 0)
        const promiseArr = cartList.map((item, i) => productModel.getBaseDetails(item.id))
        Promise.all(promiseArr)
            .then(data => {
                res.locals.headCart = {
                    cartNum,
                    cartList: data.map((item, i) => item.name),
                }
                next()
            }
            )
            .catch(err => next(err))
    } else {
        cartModel.list(req.session.user.id)
            .then(data => {
                res.locals.headCart = {
                    cartNum: data.reduce((prev, item) => prev + parseInt(item.amount), 0),
                    cartList: data.map((item, i) => item.name),
                }
                next()
            })
            .catch(err => next(err))
    }
}