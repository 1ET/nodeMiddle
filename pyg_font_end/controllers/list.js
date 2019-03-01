const listModel = require('../models/product')
const categoryModel = require('../models/category')
const paginationUtil = require('../utils/pagination')

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
            console.log(1234)
            res.locals.pageHtml = paginationUtil({ page: data[0].page, total: data[0].total })
            res.render('list.html')
            // res.json(data)
        }
        )
        .catch(err => next(err))
}
