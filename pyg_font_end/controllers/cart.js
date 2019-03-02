// 购物车有重复提交问题
// 所以需要两个路由来实现
exports.addCart = (req, res, next) => {
    const id = req.query.id
    const num = req.query.num

    req.session.user = {}
    // 加入购物车操作
    res.redirect(`/cart/addCartSuccess?id=${id}&num=${num}`)
}

exports.addCartSuccess = (req, res, next) => {
    res.render('cartAdd.html')
}
