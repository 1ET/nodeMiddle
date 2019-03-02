const productModel = require('../models/product')

exports.index = (req, res, next) => {
    console.log('item调用')
    const id = req.params.id
    Promise.all([productModel.getDetails(id), productModel.getLike('products?type=like&limit=4')])
        .then(
            data => {
                res.locals.details = data[0]
                res.locals.likes = data[1]
                // res.json(res.locals.details)
                console.log('获取数据完成')
                res.render('itemlist.html')
            }
        )
        .catch(err => {
            console.log('详情js')
            next(err)
        }
        )
}