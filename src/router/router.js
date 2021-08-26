import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminVue from '../components/features/Admin/Admin.vue'
import AllCardsVue from '../components/features/Admin/AllCards/AllCards.vue'
import SalesVue from '../components/features/Admin/Sales/Sales.vue'
import OrdersVue from '../components/features/Admin/Orders/Orders.vue'
import StockVue from '../components/features/Admin/Stock/Stock.vue'
import AnalyticsVue from '../components/features/Admin/Analytics/Analytics.vue'
import UsersVue from '../components/features/Admin/Users/Users.vue'



Vue.use(VueRouter)

const routes = [
  { path: '/', component: AdminVue },
  { path: '/allcards', component: AllCardsVue },
  { path: '/sales', component: SalesVue },
  { path: '/orders', component: OrdersVue },
  { path: '/stock', component: StockVue },
  { path: '/analytics', component: AnalyticsVue },
  { path: '/users', component: UsersVue }
]

const router = new VueRouter({
  routes 
})

export default router