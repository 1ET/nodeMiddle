const instance = require('./instanceAxios')
// 获取猜你喜欢数据
exports.getLike = () => {
    return instance.get('/products?type=like&limit=6')
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

//获取list分类下的商品列表 包含 分页信息
exports.getIndexById = (id, page, per_page, sort) => {
    return instance.get(`/categories/${id}/products?page=${page}&per_page=${per_page}&limit=5&sort=${sort}`)
        .then(res => ({
            list: res.data,
            page: +res.headers['x-current-page'],
            total: +res.headers['x-total-pages']
            // res 是响应对象   理解成响应报文  （响应状态行，响应头，响应主体内容）
            // res.data 响应主体内容  json数据
            // res.headers 响应的头  包含分页信息
        }))
        .catch(err => Promise.reject(err))
}

//获取search分类下的商品列表 包含 分页信息
exports.getIndexBySearch = (q, page, per_page, sort) => {
    q = encodeURIComponent(q)
    return instance.get(`products?page=${page}&per_page=${per_page}&sort=${sort}&q=${q}`)
        .then(res => ({
            list: res.data,
            page: +res.headers['x-current-page'],
            total: +res.headers['x-total-pages']
            // res 是响应对象   理解成响应报文  （响应状态行，响应头，响应主体内容）
            // res.data 响应主体内容  json数据
            // res.headers 响应的头  包含分页信息
        }))
        .catch(err => Promise.reject(err))
}