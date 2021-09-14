import Vue from 'vue'
import App from '../App.vue'
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
import ConnexionVue from '../components/features/Admin/Connexion/Connexion.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'connexion', component: ConnexionVue },
    { path: '/dashboard', name: 'dashboard', meta: { requiresAuth: true }, component: AdminVue },
    { path: '/allcards', name: 'allcards', meta: { requiresAuth: true }, component: AllCardsVue },
    { path: '/allcards/edit/id=:id', name: 'editcard', meta: { requiresAuth: true }, component: EditCardVue },
    { path: '/allcategories', name: 'allcategories', meta: { requiresAuth: true }, component: AllCategoriesVue },
    { path: '/allcategories/edit/id=:id', name: 'editcategory', meta: { requiresAuth: true }, component: EditCategoryVue },
    { path: '/allpages', name: 'allpages', meta: { requiresAuth: true }, component: AllPagesVue },
    { path: '/allpages/edit/id=:id', name: 'editpage', meta: { requiresAuth: true }, component: EditPageVue },
    { path: '/sales', name: 'sales', meta: { requiresAuth: true }, component: SalesVue },
    { path: '/orders', name: 'orders', meta: { requiresAuth: true }, component: OrdersVue },
    { path: '/ordersbyuserid/user_id=:id', name: 'ordersbyuser', meta: { requiresAuth: true }, component: OrderByUserIdVue },
    { path: '/users', name: 'users', meta: { requiresAuth: true }, component: UsersVue },
    { path: '/users/edit/id=:id', name: 'edituser', meta: { requiresAuth: true }, component: EditUserVue },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth){
        // if(App.user == null){
            // console.log(localStorage.getItem("token"))
            if(localStorage.getItem("token") == null || localStorage.getItem("token") == "undefined" ){
            console.log(App.user, localStorage)
            next({
                name: 'connexion'
            })
        }else{
            next()
        }
    }else{
        next()
    }
})

export default router