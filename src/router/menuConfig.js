
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
    {
        title: "权限",
        lanageKey: "public.home",
        path: "/ums",
        icon: "order",
        roles: ["admin", "editor", "guest"],
        children: [
            {
                title: "权限列表",
                path: "/ums/permission",
            },
            {
                title: "用户列表",
                path: "/order/account",
            }
        ]
    },
]

export default menuList