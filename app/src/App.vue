<template>
  <div>
      <Header></Header>
      <!-- 路由组件出口的地方 -->
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
// 引入
import Header from './components/Header'
import Footer from './components/Footer';
export default {
  name: '',
  components:{
    Header,
    Footer
  },
  mounted() {
    // 因为放在TypeNav，Home和Search跳转每次都要发请求，放这里只发一次请求
    this.$store.dispatch('categoryList')
  },
}
</script>

<style scoped>

</style>
