const productModel = require('../models/product')

exports.index = (req, res, next) => {
    const id = req.params.id
    Promise.all([productModel.getDetails(id), productModel.getLike('products?type=like&limit=4')])
        .then(
            data => {
                res.locals.details = data[0]
                res.locals.likes = data[1]
                // res.json(res.locals.details)
                res.render('item.html')
            }
        )
        .catch(err => {
            next(err)
        }
        )
}