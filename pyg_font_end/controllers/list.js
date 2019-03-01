const listModel = require('../models/product')
const categoryModel = require('../models/category')

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
    listModel.getIndexById(id, page, per_page, sort)
        .then(data => res.render('list.html'))
        .catch(err => next(err))
}
