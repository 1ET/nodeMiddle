// 维护品优购项目所有的配置项

{/* <title>京东(JD.COM)-正品低价、品质保障、配送及时、轻松购物！</title>
    <meta name="description" content="京东JD.COM-专业的综合网上购物商城，为您提供正品低价的购物选择、优质便捷的服务体验。商品来自全球数十万品牌商家，囊括家电、手机、电脑、服装、居家、母婴、美妆、个护、食品、生鲜等丰富品类，满足各种购物需求。" />
    <meta name="Keywords" content="网上购物,网上商城,家电,手机,电脑,服装,居家,母婴,美妆,个护,食品,生鲜,京东" /> */}
// 1.网站公有信息
exports.site = {
    title: '京东(JD.COM)-正品低价、品质保障、配送及时、轻松购物！',
    description: '京东JD.COM-专业的综合网上购物商城，为您提供正品低价的购物选择、优质便捷的服务体验。商品来自全球数十万品牌商家，囊括家电、手机、电脑、服装、居家、母婴、美妆、个护、食品、生鲜等丰富品类，满足各种购物需求。',
    Keywords: '网上购物,网上商城,家电,手机,电脑,服装,居家,母婴,美妆,个护,食品,生鲜,京东'
}

// 2.封装axios配置
exports.api = {
    baseURL: 'http://127.0.0.1:8000/v1',
    timeout: 5000,
    username: 'newshop-frontend',
    password: 'd8667837fce5a0270a35f4a8fa14be479fadc774'
}

/*3. 连接数据库配置*/
exports.mysql = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'newshop'
}

// 4.配置session信息
exports.cartCookie = {
    key: 'pyg64_cart_info',
    expires: 1000 * 60 * 60 * 24 * 15
}

// 5.记住我功能实现
/*5. 自动登录相关配置*/
exports.loginCookie = {
    key: 'pyg64_user_info',
    expires: 7 * 24 * 60 * 60 * 1000
}