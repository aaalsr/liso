import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox } from 'element-ui'
// 第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 注册全局组件(使用element-ui)
Vue.component(Button.name,Button)
// element-ui注册组件还可以挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入路由
import router from '@/router';
// 引入仓库
import store from '@/store'
// 引入MockServe.js(mock数据)
import '@/mock/mockServe'
// 引入swiper样式(在这里引入样式轮播图不显示)
// 将v-for加错类名了，下次仔细检查
import 'swiper/css/swiper.css'
// 测试接口，参数至少是一个空对象
// import { reqGetSearchInfo } from '@/api'
// console.log(reqGetSearchInfo({}));
Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
import lbxx from '@/assets/1.gif'
// 引入插件(应该要重新安装成1.3.3版本cnpm i vue-lazyload@1.3.3 -S)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading: lbxx
})
// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})
// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由：底下的写法是kv一致省略V【router的r小写】
  router,
  // 注册仓库：组件实例身上会多一个$store属性
  store
}).$mount('#app')
