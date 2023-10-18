<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <!-- 注意大小写 -->
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props: ['list'],
  watch: {
    list:{
       // 立即监听一次，因为数据是父组件给定不会变化（handler监听不到）
       immediate:true,
       handler() {
        // 即使如此也只能监听到有数据，v-for动态渲染结构无法确定>nextTick
        this.$nextTick(()=>{
            var mySwiper = new Swiper(
            // document.querySelector(".swiper-container"),下面是vue的写法
            this.$refs.cur,
            {
              //开启循环模式
              loop: true,
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                //点击分页器，切换轮播
                // pagination: ".pagination",
                clickable: true,
                // pagination: ".swiper-pagination",
                // paginationClickable: true
              },
              // observer:true, // 修改swiper自己或子元素时，自动初始化swiper
              // observeParents:true, // 修改swiper的父元素时，自动初始化swiper
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              //切换效果
              // effect: "cube",
            })  
        })
       }
    }
  },
};
</script>

<style scoped>
</style>
