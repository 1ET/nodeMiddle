const path = require('path')
const template = require('art-template')
const url = require('url')
module.exports = (options) => {
    if (!(options.page && options.total)) return "";
    const { page, total } = options
    const btnNum = options.btnNum || 5
    // 理想情况下
    let end = page + Math.floor(btnNum / 2)
    let start = end - btnNum + 1
    end = end > total ? total : end
    start = end - btnNum + 1
    start = start < 1 ? 1 : start
    end = start + btnNum - 1
    end = end > total ? total : end
    // 获取url对象
    const urlObject = url.parse(options.url, true)
    // console.log(options.url)
    // 设置函数改变url中的page值
    const getUrl = (page) => {
        urlObject.query.page = page
        urlObject.search = undefined
        const srtUrl = url.format(urlObject)
        return srtUrl
    }
    // console.log(options.url)
    const templateUrl = path.join(__dirname, '../views/common/pagination.html')
    const html = template(templateUrl, {
        page,
        total,
        btnNum,
        start,
        end,
        getUrl,
        pathName:urlObject.pathname,
        query:urlObject.query
    })
    return html
}
