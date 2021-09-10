import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminVue from '../components/features/Admin/Admin.vue'
import AllCardsVue from '../components/features/Admin/AllCards/AllCards.vue'
import AllCategoriesVue from '../components/features/Admin/AllCategories/AllCategories.vue'
import SalesVue from '../components/features/Admin/Sales/Sales.vue'
import OrdersVue from '../components/features/Admin/Orders/Orders.vue'
import OrderByUserIdVue from '../components/features/Admin/Orders/OrderByUserId.vue'
import UsersVue from '../components/features/Admin/Users/Users.vue'
import EditUserVue from '../components/features/Admin/Users/EditUser.vue'
import EditCardVue from '../components/features/Admin/AllCards/EditCard.vue'
import EditCategoryVue from '../components/features/Admin/AllCategories/EditCategory.vue'
import AllPagesVue from '../components/features/Admin/AllPages/AllPages.vue'
import EditPageVue from '../components/features/Admin/AllPages/EditPage.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/', component: AdminVue },
    { path: '/allcards', component: AllCardsVue },
    { path: '/allcards/edit/id=:id', component: EditCardVue },
    { path: '/allcategories', component: AllCategoriesVue },
    { path: '/allcategories/edit/id=:id', component: EditCategoryVue },
    { path: '/allpages', component: AllPagesVue },
    { path: '/allpages/edit/id=:id', component: EditPageVue },
    { path: '/sales', component: SalesVue },
    { path: '/orders', component: OrdersVue },
    { path: '/ordersbyuserid/user_id=:id', component: OrderByUserIdVue },
    { path: '/users', component: UsersVue },
    { path: '/users/edit/id=:id', component: EditUserVue },
]

const router = new VueRouter({
    routes
})

export default router