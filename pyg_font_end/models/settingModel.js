const instance = require('./instanceAxios')
// 获取轮播图信息
exports.getSliders = () => {
    return instance.get('/settings/home_slides')
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}
