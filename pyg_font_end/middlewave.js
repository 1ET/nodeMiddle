const config = require('./configs')
exports.global = (req, res, next) => {
    res.locals.site = config.site
    next()
} 