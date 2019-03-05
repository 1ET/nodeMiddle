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
// 封装axios
module.exports = instance