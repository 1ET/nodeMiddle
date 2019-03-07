const order = require('../models/order')
// 订单相关路由
exports.addOrder = (req, res, next) => {
    order.addOrder(req.session.user.id, req.query.items)
        .then(data => res.redirect('/checkout?num=' + data.order_number))
        .catch(err => next(err))
}
exports.checkoutOrder = (req, res, next) => {
    order.item(req.query.num)
        .then(data => {
            res.locals.order = data
            res.render('order.html')
        })
        .catch(err => next(err))
}

exports.myOrder = (req, res, next) => {
    order.list(req.session.user.id)
        .then(data => {
            res.locals.order = data
            res.render('myAllOrder.html')
        })
        .catch(err => next(err))
}
