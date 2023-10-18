// 引入路由组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

const foo =()=>{
    return import('@/pages/Home')
}

export default [
    {
        path: '/center',
        component: Center,
        meta: {
            isShow: true
        },
        // 二级路由组件
        children: [
            {
              path: 'myorder',
              component: MyOrder
            },
            {
              path: 'grouporder',
              component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
              },
        ]

    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            isShow: true
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: {
            isShow: true
        },
        
        beforeEnter: (to,from,next) => {
            if(from.path == '/trade') {
                next()
            }else{
                next(false)
            }
        }

    },
    {
        path: '/trade',
        component: Trade,
        meta: {
            isShow: true
        },
        // 路由独享守卫
        beforeEnter: (to,from,next) => {
            if(from.path == '/shopcart') {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: {
            isShow: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component:  AddCartSuccess,
        meta: {
            isShow: true
        }
    },
    {
        // 路由跳转传递params参数，故需要占位
        path: '/detail/:skuid',
        component:  Detail,
        meta: {
            isShow: true
        }
    },
    {
        path:"/home",
        component: foo,
        meta:{show:true}
    }
    ,
    {
        path:"/search/:keyword?",
        component: Search,
        meta:{show:true},
        name:"search"
    },
    {
        // 路由懒加载的简写形式
        path:'/login',
        component: ()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:'/register',
        component: Register,
        meta:{show:false}
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path:'*',
        redirect:"/home"
    }
]