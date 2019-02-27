const config = require('./configs')
const categoryModel = require('./models/category')
exports.global = (req, res, next) => {
    res.locals.site = config.site
    categoryModel.getCategory()
        .then(data => {
            res.locals.Category = data
            next()
        })
        .catch(err => next(err))

} 