const instance = require('./instanceAxios')

exports.getCategory = () => {
    return instance.get('/categories?format=tree')
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}