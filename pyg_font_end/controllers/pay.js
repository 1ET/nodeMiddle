const orderModel = require('../models/order')
const alipay = require('../utils/alipay')
exports.pay = (req, res, next) => {
    const num = req.query.num
    //获取订单编号
    orderModel.item(num)
        .then(
            data => {
                const url = alipay.getPayUrl(data)
                res.redirect(url)
            }
        )
        .catch(err => next(err))
}

exports.callback = (req, res, next) => {
    //修改订单的状态
    //获取订单的编号  req.query.out_trade_no
    const out_trade_no = req.query.out_trade_no
    //支付宝流水  req.query.trade_no
    const trade_no = req.query.trade_no
    orderModel.edit(out_trade_no, 1, trade_no)
        .then(order => {
            //成功提示 订单信息  页面展示
            res.locals.order = order
            console.log(order)
            res.render('paySuccess.html')
        }).catch(err => next(err))
}