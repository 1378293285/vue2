<template>
  <div>
    <!-- keep-alive使钩子函数只走一次 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBarIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
</style>
