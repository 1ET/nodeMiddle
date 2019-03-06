const listModel = require('../models/product')
const categoryModel = require('../models/category')
const paginationUtil = require('../utils/pagination')

// 获取list数据
exports.index = (req, res, next) => {
    // 页面所需文件
    // 1.id
    // 2.当前页
    // 3.页码组
    // 4.排序
    const id = req.params.id
    const page = req.query.page || 1
    const per_page = 5
    const sort = req.query.sort || 'commend'
    Promise.all([listModel.getIndexById(id, page, per_page, sort), categoryModel.getCategoryAndParent(id)])
        .then(data => {
            res.locals.list = data[0].list
            res.locals.sort = sort
            res.locals.breadcrumb = data[1]
            res.locals.pageHtml = paginationUtil({ page: data[0].page, total: data[0].total, url: req.url })
            res.render('list.html')
            // res.json(data)
        }
        )
        .catch(err => next(err))
}

// 获取search数据
exports.search = (req, res, next) => {
    const q = req.query.q
    const page = req.query.page || 1
    const per_page = 5
    const sort = req.query.sort || 'commend'
    Promise.all([listModel.getIndexBySearch(q, page, per_page, sort)])
        .then(data => {
            res.locals.q = q
            res.locals.list = data[0].list
            res.locals.sort = sort
            res.locals.pageHtml = paginationUtil({ page: data[0].page, total: data[0].total, url: req.url })
            res.render('list.html')
            // res.json(data)
        }
        )
        .catch(err => next(err))
}
