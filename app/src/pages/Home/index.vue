<template>
  <div>
   <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入  -->
     <TypeNav/>
     <ListContainer/>
     <Recommend/>
     <Rank/>
     <Like/>
     <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
     <Brand/>
     
  </div>
</template>

<!-- <script  id ="data" type ="application / json" > -->
<script>
// 引入其余的组价(非全局组件需要注册)
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'

export default {
  name: '',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    // 派发action,获取floor组件的数据
    this.$store.dispatch('getFloorList')
    // 获取用户信息在首页展示(有许多组件都要派发，好像后面解决了因此不需要在每个组件单独派发)---报错!就是加上了这个
    // 登录成功并且跳转，但不携带token，有可能是后面的统一派发在router的index.js中getUserInfo有问题叭
    // 记得改回去，为啥这样了还不派发呢 
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
     ...mapState({
      floorList: state => state.home.floorList
     })
  },
}
</script>

<style scoped>

</style>
