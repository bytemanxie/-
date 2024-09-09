
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login')
    },
    {
        path: '/menu',
        name: 'Menu',
        component: () => import('@/views/menu'),
        children:[
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home')
            },
            {
                path: '/set',
                name: 'Set',
                component: () => import('@/views/set')
            },
            {
                path: '/overview',
                name: 'Overview',
                component: () => import('@/views/overview')
            },
            {
                path: '/product_manage',
                name: 'ProductManage',
                component: () => import('@/views/user_manage/product_manage')
            },
            {
                path: '/users_manage',
                name: 'UsersManage',
                component: () => import('@/views/user_manage/users_manage')
            },
            {
                path: '/message_manage',
                name: 'MessageManage',
                component: () => import('@/views/user_manage/message_manage')
            },
            {
                path: '/user_list',
                name: 'UserList',
                component: () => import('@/views/user_manage/user_list')
            },
        ]
    },
    
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})