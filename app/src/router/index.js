// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store'

// 把原有的vueRouter原型对象的push,先保存一份，进行二次封装
let originPush = VueRouter.prototype.push

// 重写push||replace
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        // call||apply区别
        // 相同点，都可以调用函数一次，都可以篡改函数上下文一次
        // 不同点，call与apply传递参数，call传递参数用逗号隔开,apply方法执行传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to,from,savePosition) {
        // 返回y=0，代表滚动条在最上方
        return {y:0}
    }
}) 
// 全局守卫：前置守卫（在路由跳转间判断）
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到你要跳转到哪个路由的信息
    // from:可以获取到你从哪个路由来的信息
    // next:放行函数 next()全部放行 next(path)放行到指定路由 next(false)  
// 方便测试，统一放行
    // next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token) {
         //用户已经登录还想去login，只能停在首页
        //  to是一个对象，里面有path可以获取到你要跳转到哪个路由的信息
         if(to.path=='/login') {
            next('/home')
         }else{
            // 已登录但不去login
             if(name){
                next()
             } else {
                //已登录但没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    next()
                    await store.dispatch('getUserInfo')                   
                } catch (error) {
                // token过期了获取不到用户信息（重新登录）
                // 清除token
                await store.dispatch('userLogout')
                next('/login')
                }
             }
            
         }
    } else {
        // 未登录不能去交易相关，不能去支付相关【pay|paysuccess】、个人中心
       let toPath = to.path
       if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1) {
        next('/login?redirect='+toPath)
       } else {
        // 去的不是上面路由--放行
         next() 
       }
    
    }
})
export default router