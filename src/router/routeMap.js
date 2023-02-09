import Loadable from "react-loadable"
import Loading from '@/components/Loading'

const Dashboard = Loadable({
    loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/Dashboard'),
    loading: Loading
});

const GoodsList = Loadable({
    loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/Goods/GoodsList'),
    loading: Loading
});

const GoodsInfo = Loadable({
    loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/Goods/GoodsInfo'),
    loading: Loading
});

const routeList = [
    { path: "/dashboard", component: Dashboard },
    { path: "/goods/goodsList", component: GoodsList },
    { path: "/goods/goodsInfo", component: GoodsInfo },
]

export default routeList