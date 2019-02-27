const instance = require('./instanceAxios')
// 获取猜你喜欢数据
exports.getLike = () => {
    return instance.get('/products?type=like&limit=6')
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}