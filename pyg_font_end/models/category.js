//分类相关的数据获取方法
const instance = require('./instanceAxios')

//获取所有的分类信息数据结构是树状的
exports.getCategory = () => {
    return instance.get('/categories?format=tree')
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}


//获取某一个分类及其父级分类
exports.getCategoryAndParent = (id) => {
    return instance.get(`categories/${id}?include=parent`)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}