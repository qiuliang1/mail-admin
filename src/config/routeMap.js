import Loadable from 'react-loadable'
import Loading from '@/components/Loading'

const Dashboard = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/Dashboard'),
  loading: Loading
})

const GoodsList = Loadable({
  loader: () =>
    import(/*webpackChunkName:'Dashboard'*/ '@/views/Goods/GoodsList'),
  loading: Loading
})

const GoodsInfo = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/Goods/Spare'),
  loading: Loading
})

const Logistics = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/Logistics'),
  loading: Loading
})

const Permission = Loadable({
  loader: () =>
    import(/*webpackChunkName:'Dashboard'*/ '@/views/Ums/Permission'),
  loading: Loading
})

const Role = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/Ums/Role'),
  loading: Loading
})

const Account = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/Ums/Account'),
  loading: Loading
})

const routeList = [
  { path: '/dashboard', component: Dashboard },
  { path: '/commodity/list', component: GoodsList },
  { path: '/commodity/spare', component: GoodsInfo },
  // { path: "/class", component: Category },
  { path: '/ums/permission', component: Permission },
  { path: '/role', component: Role },
  { path: '/account', component: Account },
  { path: '/logistics', component: Logistics }
]

export default routeList
