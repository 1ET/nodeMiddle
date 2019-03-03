const configs = require('../configs')


// 购物车有重复提交问题
// 所以需要两个路由来实现
exports.addCart = (req, res, next) => {
    const id = req.query.id
    const num = req.query.num
    // req.session.user = {}
    // 判断是否登陆
    if (!req.session.user) {
        // 获取cookie中的cartCookies属性的key值(基于express-session)
        // 此时获取的是json格式的字符串从
        const cartCookie = req.cookies[configs.cartCookie.key] || '[]'
        const cartList = JSON.parse(cartCookie)
        // 获取原来的商品数据，并添加新的商品
        const newItem = cartList.find((item, i) => item.id == id)
        if (newItem) {
            // 有点不懂
            newItem.num += parseInt(num)
        } else {
            cartList.push({ id, num })
        }
        // 更新cookie
        const expires = new Date(Data.now()+1000*60*60*24*15)
        res.cookie('configs.cartCookie.key',JSON.stringify(cartList),expires)
        // 加入购物车操作
        res.redirect(`/cart/addCartSuccess?id=${id}&num=${num}`)
    } else {
        res.redirect(`/cart/addCartSuccess?id=${id}&num=${num}`)

    }

}

exports.addCartSuccess = (req, res, next) => {
    res.render('cartAdd.html')
}
