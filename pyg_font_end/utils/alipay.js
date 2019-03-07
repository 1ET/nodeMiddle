const path = require('path')
const Alipay = require('alipay-node-sdk')

const ali = new Alipay({
    appId: '2016092500596095',
    notifyUrl: 'http://127.0.0.1:3000/callback/alipay',
    rsaPrivate: path.join(__dirname, './rsa_private_key.pem'),
    rsaPublic: path.join(__dirname, './rsa_public_key.pem'),
    sandbox: true,
    signType: 'RSA2'
})


exports.getPayUrl = (order) => {
    const params = ali.pagePay({
        //支付的标题
        subject: '品优购商品',
        //具体哪一些商品
        body: order.products.map((item, i) => item.name).join('\n'),
        //商户的交易编号
        outTradeId: order.order_number,
        //超时时间
        timeout: '10m',
        //支付金额
        amount: order.total_price,
        //商品类型   虚拟 0  实物  1
        goodsType: '1',
        //二维码支付模式  确定二维码的类型
        qrPayMode: 2,
        //回调的地址
        return_url: 'http://127.0.0.1:3000/pay/callback'
    })
    // 支付宝应用网关
    return 'https://openapi.alipaydev.com/gateway.do?' + params
}
