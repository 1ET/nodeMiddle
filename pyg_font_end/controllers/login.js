const svgCaptcha = require('svg-captcha');
const createError = require('http-errors')
const userModel = require('../models/user')
const configs = require('../configs')
const cartModel = require('../models/cart')

// 页面展示
exports.login = (req, res, next) => {
    const captcha = svgCaptcha.createMathExpr({ width: 120, height: 30 })
    // 存储svg属性
    res.locals.svg = captcha.data
    // 记录结果 下次做比较
    req.session.text = captcha.text
    // 设置回调地址
    res.locals.returnUrl = req.query.returnUrl || '/member'
    res.render('login.html')
}

// 登录逻辑
exports.loginLogic = (req, res, next) => {
    const { returnUrl, username, password, captcha, auto } = req.body
    Promise.resolve().
        then(() => {
            // 信息不完整
            if (!(username && password && captcha)) throw createError(444, "请填写完整信息")
            // 验证码不匹配
            if (captcha !== req.session.text) throw createError(444, '验证码错误')
            return userModel.login(username, password)
        }
        ).then((user => {
            if (!user) throw createError(444, '登录失败')
            // 登录成功存session
            req.session.user = user
            // 判断是否勾选自动登录 如果登录 把数据存在cookie里
            if (auto) {
                res.cookie(userCookie.loginCookie.key,
                    JSON.stringify({ id: user.id, pwd: user.password }),
                    { expires: new Date(Data.now + userCookie.loginCookie.expires), httpOnly: true })
            }
            // 登录成功 合并购物车
            // 把本地的取出来 添加到服务器
            const cartCookie = req.cookies[configs.cartCookie.key] || '[]'
            const cartList = JSON.parse(cartCookie)
            const promiseArr = cartList.map((item, i) => { cartModel.add(user.id, item.id, item.num) })
            return Promise.all(promiseArr)
        })).then((data) => {
            // 登录成功 清空本地购物车
            res.clearCookie(configs.cartCookie.key)
            // 跳转回 returnUrl
            res.redirect(req.body.returnUrl || '/member')
        }
        )
        .catch(err => {
            // 统一错误处理
            if (err.status === 444) {
                res.locals.msg = err.message
            } else {
                console.log(err)
                res.locals.msg = '登录失败'
            }
            // 更改验证码 重新渲染登录页面
            const captcha = svgCaptcha.createMathExpr({ width: 120, height: 30 })
            // 存储svg属性
            res.locals.svg = captcha.data
            // 记录结果 下次做比较
            req.session.text = captcha.text
            // 设置回调地址
            res.locals.returnUrl = req.query.returnUrl || '/member'
            res.render('login.html')
        })
}