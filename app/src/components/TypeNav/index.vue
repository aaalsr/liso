<!-- vue+tab键快速生成代码模版 -->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 应该把鼠标移除事件委托给父元素 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 如果写在每个a标签则会有多个回调函数也会卡顿，so放在这里只用一次（事件委派） -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 因为router-link是组件故采用声明式导航会出现卡顿 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：把lodash全部功能函数引入 一般是按需引入
// 最好按需引入,因为引入的{throttle}是函数故不要_又因为该函数默认暴露不要{}
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪个一级分类，索引0-15，且一开始并不会有背景色故不能在0-15内
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    // 发请求经常在mounted生命周期函数中进行
    // 通知Vuex发请求，获取数据，存储于仓库中
    // 昨天这样写报错了加了路径好了，今天这样才能行
    // 当组件挂载完毕，让show属性更改为false(注意此时再调回home还是false)

    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //  好迷，注入一个参数state，即为大仓库的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入则修改响应式数据currentIndex属性
    // 正常情况（缓慢操作）：鼠标进入，每个一级分类h3都会触发鼠标进入事件
    // 非正常：部分h3触发（由于用户行为过快导致浏览器反应不来。若当前回调函数中有一些大量业务，有可能会出现卡顿现象）
    // changeIndex: _.throttle(function(index) {不要_.因为直接引入了该函数
    changeIndex: throttle(function (index) {
      // console.log(index)可以拿到鼠标所在一级分类元素的索引值
      this.currentIndex = index;
    }, 50),
    // 一级分类鼠标移除的事件回调
    leaveIndex() {
      // console.log(666);鼠标移除则令currentIndex=-1
      this.currentIndex = -1;
      // 注：只有在search下才需要显示隐藏home不能有
      if (this.$route.path != "/home") {
        this.show = false;
      }
      // 但是和原页面区别在于H2（红框）也会有鼠标移除事件，但methods的两个方法只在H3有，因此需要事件委派
    },
    // 进行路由跳转的方法
    goSearch(event) {
      //  this.$router.push('/search') 跳转不了
      // 解决：编程式导航+事件委派，但委托给父元素（有许多子），我们需要的只有a标签，如何获取参数
      // 还有即使确定了a标签又如何区分一级、二级、三级
      let element = event.target;
      // console.log(element);获取到当前到这个事件的节点
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值（浏览器自动将自定义属性的驼峰改成小写）
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 如何确定一级分类、二级、三级的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候，带有params参数，捎带传递过去
        // 前面过渡，优化都没问题，合并参数这里莫名其妙三级联动不见了,前面注掉这里也恢复不了，重启项目好几次才好了
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完参数
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 鼠标移入让商品分类列表展示
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
      // 就说怎么报错写错位置了，应该写all-sort-list2里面
      // .cur {
      //   background: skyblue;
      // // .bc {
      // //   line-height: 45px ;
      // // }
      // }
    }
    // 过渡动画的样式
    // 过渡动画开始
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>

