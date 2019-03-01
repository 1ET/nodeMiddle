const config = require('./configs')
const categoryModel = require('./models/category')

// 获取配置信息
exports.global = (req, res, next) => {
    res.locals.site = config.site
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