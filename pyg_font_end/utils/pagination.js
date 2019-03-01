const path = require('path')
const template = require('art-template')
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
    const templateUrl = path.join(__dirname, '../views/common/pagination.html')
    const html = template(templateUrl, { page, total, btnNum, start, end })

    return html
}
