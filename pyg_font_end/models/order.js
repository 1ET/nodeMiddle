// 订单相关Model
const instance = require('./instanceAxios')

// 添加订单
exports.addOrder = (user_id, items) => {
    return instance.post('/orders', { user_id, items })
        .then(result => result.data)
        .catch(err => Promise.reject(err))
}

// 核对单个订单
exports.item = (num) => {
    return instance.get(`orders/${num}`)
        .then(result => result.data)
        .catch(err => Promise.reject(err))
}

// 核对所有订单
exports.list = (userId) => {
    return instance.get(`orders/?user_id=${userId}`)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

// 修改订单
exports.edit = (num, pay_status, trade_no) => {
    return instance.patch(`orders/${num}`, { pay_status, trade_no })
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}