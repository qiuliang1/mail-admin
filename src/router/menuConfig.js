
const menuList = [
    {
        title: "首页",
        lanageKey: "public.home",
        path: "/dashboard",
        icon: "home",
        roles: ["admin", "editor", "guest"]
    },
    {
        title: "商品",
        lanageKey: "public.home",
        path: "/goods",
        icon: "home",
        roles: ["admin", "editor", "guest"],
        children: [
            {
                title: "商品列表",
                path: "/goods/goodsList",
            },
            {
                title: "添加商品",
                path: "/goods/goodsInfo",
            }
        ]
    },
    {
        title: "订单",
        lanageKey: "public.home",
        path: "/order",
        icon: "order",
        roles: ["admin", "editor", "guest"],
        children: [
            {
                title: "订单列表",
                path: "/order/orderList",
            },
            {
                title: "订单设置",
                path: "/order/orderSetting",
            }
        ]
    },
]

export default menuList