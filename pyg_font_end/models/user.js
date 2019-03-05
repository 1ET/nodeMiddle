const instance = require('./instanceAxios')

// 用户登录
exports.login = (username, password) => {
    return instance.post('users/login', { username, password })
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}
