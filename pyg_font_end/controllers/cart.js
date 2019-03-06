const configs = require('../configs')
const productModel = require('../models/product')
const cartModel = require('../models/cart')

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
            newItem.num = parseInt(newItem.num) + parseInt(num)
        } else {
            cartList.push({ id, num })
        }
        // 更新cookie
        const expires = new Date(Date.now() + configs.cartCookie.expires)
        res.cookie(configs.cartCookie.key, JSON.stringify(cartList), { expires })        // 加入购物车操作
        res.redirect(`/cart/addCartSuccess?id=${id}&num=${num}`)
    } else {
        cartModel.add(req.session.user.id, id, num)
            .then(
                res.redirect(`/cart/addCartSuccess?id=${id}&num=${num}`)
            )
            .catch(err => next(err))

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

// 购物车列表
exports.list = (req, res, next) => {
    res.locals.returnUrl = req.url
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
        cartModel.list(req.session.user.id)
            .then(data => {
                res.json({
                    code: 200,
                    list: data.map((item, i) => ({
                        id: item.id,
                        name: item.name,
                        thumbnail: item.thumbnail,
                        price: item.price,
                        amount: 100,
                        num: item.amount
                    }))
                })
            })
            .catch(err => {
                res.json('获取购物车信息失败')
            })
    }
}

exports.edit = (req, res, next) => {
    const { id, num } = req.body
    if (!req.session.user) {
        //约定传参 id num 请求方式 post
        //获取购物车数据
        const cartCookie = req.cookies[configs.cartCookie.key] || '[]'
        const cartList = JSON.parse(cartCookie)
        //修改
        const product = cartList.find((item, i) => item.id == id)
        product.num = +num
        //存储
        const expires = new Date(Date.now() + configs.cartCookie.expires)
        res.cookie(configs.cartCookie.key, JSON.stringify(cartList), { expires })
        //成功
        res.json({ code: 200, msg: '修改成功' })
    } else {
        cartModel.edit(req.session.user.id, id, num)
            .then(data => {
                res.json({ code: 200, msg: '修改成功' })
            }).catch(err => {
                res.json({ code: 500, msg: '修改失败' })
            })
    }
}

exports.delete = (req, res, next) => {
    const { id } = req.body
    if (!req.session.user) {
        const cartCookie = req.cookies[configs.cartCookie.key] || '[]'
        const cartList = JSON.parse(cartCookie)
        const nub = cartList.findIndex((item, i) => item.id == id)
        cartList.splice(nub, 1)
        const expires = new Date(Date.now() + configs.cartCookie.expires)
        res.cookie(configs.cartCookie.key, JSON.stringify(cartList), { expires })
        res.json({ code: 200, msg: '删除成功' })
    } else {
        cartModel.remove(req.session.user.id, id)
            .then(data => {
                res.json({ code: 200, msg: '删除成功' })
            }).catch(err => {
                res.json({ code: 500, msg: '删除失败' })
            })
    }
}


