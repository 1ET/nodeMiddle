const configs = require('../configs')
const productModel = require('../models/product')

// 购物车有重复提交问题
// 所以需要两个路由来实现
exports.addCart = (req, res, next) => {
    const id = req.query.id
    const num = req.query.num
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
        const expires = new Date(Date.now() + configs.cartCookie.expires)
        res.cookie(configs.cartCookie.key, JSON.stringify(cartList), { expires })        // 加入购物车操作
        res.redirect(`/cart/addCartSuccess?id=${id}&num=${num}`)
    } else {
        res.redirect(`/cart/addCartSuccess?id=${id}&num=${num}`)

    }

}

exports.addCartSuccess = (req, res, next) => {
    const id = req.query.id
    const num = req.query.num
    // 需要获取购物车标题，图片等数据
    productModel.getBaseDetails(id)
        .then(data => {
            res.locals.products = {
                name: data.name,
                thumbnail: data.thumbnail,
                id: data.id,
                num
            }
            res.render('cartAdd.html')
        })
        .catch(err => next(err))
}

// 展示购物车页面
exports.index = (req, res, next) => {
    res.locals.user = req.session.user
    res.render('cart.html')
}

exports.list = (req, res, next) => {
    if (!req.session.user) {
        // 获取cookie中的所有数据的id
        const cartCookie = req.cookies[configs.cartCookie.key] || '[]'
        const cartList = JSON.parse(cartCookie)
        const promiseArr = cartList.map((item, i) => productModel.getBaseDetails(item.id))
        Promise.all(promiseArr)
            .then(data =>
                res.json(
                    {
                        code: 200,
                        list: data.map((item, i) => ({
                            id: item.id,
                            name: item.name,
                            thumbnail: item.thumbnail,
                            price: item.price,
                            amount: item.amount,
                            num: +cartList[i].num
                        }))

                    }
                ))
            .catch(err => {
                res.json({ message: '获取商品信息失败', code: 500 })
            })


    } else {
    }
}

exports.edit = (req, res, next) => {
    if (!req.locals.user) {

    } else {

    }
}





