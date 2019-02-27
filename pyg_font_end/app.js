const express = require('express')
const Youch = require('youch')
const artTemplate = require('express-art-template')
const createError = require('http-errors')
const path = require('path')
const favicon = require('express-favicon');

// 实例化app对象
const app = express()
// 配置模板引擎
app.engine('html', artTemplate)
app.set('views options',{ debug: process.env.NODE_ENV === 'development' });
// app.set('views', { debug: process.env.NODE_ENV === 'development' });
// 处理静态资源
app.use('/', express.static(path.join(__dirname, 'public')))
// 处理ico小图标
app.use(favicon(path.join(__dirname,'favicon.ico')))

app.listen(5000, () => {
    console.log('正在监听端口5000')
})

// 测试路由
app.get('/', (req, res, next) => {
    res.locals.site = require('./configs').site
    res.render('home.html')
    // throw createError(500, 'server carch')
})

// 处理404
app.use((req, res, next) => {
    next(createError(404, 'Not Found'))
})


app.use((err, req, res, next) => {
    const env = req.app.get('env')
    // console.log(env)
    // console.log(err.status)
    if (env === 'production') {
        new Youch(err, req).toHTML().then((html) => {
            res.send(html)
        })
    } else {
        res.render('error.html', { status: err.status })
    }
})