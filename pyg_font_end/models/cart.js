const instance = require('./instanceAxios')
// 购物车相关
exports.add = (userId, id, num) => {
    return instance.post(`users/${userId}/cart`, { id, amount: num })
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

exports.list = (userId) => {
    return instance.get(`users/${userId}/cart`)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

exports.edit = (userId, id, num) => {
    return instance.patch(`users/${userId}/cart/${id}`, { amount: num })
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

exports.remove = (userId, id) => {
    return instance.delete(`users/${userId}/cart/${id}`)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}