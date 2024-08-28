
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
            }
        ]
    },
    
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})