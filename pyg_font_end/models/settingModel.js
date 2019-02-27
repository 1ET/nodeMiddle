const axios = require('axios')
const { api } = require('../configs')
var instance = axios.create({
    baseURL: api.baseURL,
    timeout: api.timeout,
    auth: {
        username: api.username,
        password: api.password
    },
})
// 获取轮播图信息
exports.getSliders = () => {
    return instance.get('/settings/home_slides')
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}