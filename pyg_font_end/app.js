const express = require('express')
const Youch = require('youch')
const artTemplate = require('express-art-template')
const createError = require('http-errors')
const path = require('path')
const favicon = require('express-favicon');
const middlewares = require('./middlewave')
const routers = require('./router')
const configs = require('./configs')

// 实例化app对象
const app = express()
// 配置模板引擎
app.engine('html', artTemplate)
app.set('views options', { debug: process.env.NODE_ENV === 'development' });
// app.set('views', { debug: process.env.NODE_ENV === 'development' });
// 处理静态资源
app.use('/', express.static(path.join(__dirname, 'public')))
// 处理ico小图标
app.use(favicon(path.join(__dirname, 'favicon.ico')))

/*处理请求体提交数据*/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(3000, () => {
    console.log('正在监听端口3000')
})

// 配置session信息
// session持久化
const session = require('express-session')
const MySqlSession = require('express-mysql-session')(session)
const sessionStore = new MySqlSession(configs.mysql)
app.use(session({
    key: 'PYGIDS',  //session id
    secret: 'pyg_secret',   //加密字符
    store: sessionStore,    //持久化对象
    resave: false,   //重新保存session  当session有有效期的时候回设置成true
    saveUninitialized: false //是否在服务器启动的时候初始化session对象 还是在使用session的时候初始化session对象
}))


// 定制cookie中间件
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// 定制信息中间件
app.use(middlewares.global, middlewares.cartHeader)


// 挂载路由
app.use(routers)
// 测试路由
// app.get('/', (req, res, next) => {
//     res.locals.site = require('./configs').site
//     res.render('home.html')
//     // throw createError(500, 'server carch')
// })

// 处理404
app.use((req, res, next) => {
    next(createError(404, 'Not Found'))
})


app.use((err, req, res, next) => {
    const env = req.app.get('env')
    // console.log(env)
    // console.log(err.status)
    if (env === 'development') {
        new Youch(err, req).toHTML().then((html) => {
            res.send(html)
        })
    } else {
        res.render('error.html', { status: err.status })
    }
})