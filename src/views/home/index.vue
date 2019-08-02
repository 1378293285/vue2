<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="首页" fixed />

    <!-- tab栏 -->
    <van-tabs v-model="activeIndex" class="channel-tab">
      <van-tab :title="item.name"
        v-for="(item) in channels"
        :key="item.id"
      >
        <!-- 列表 -->
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.downPullLoading" @refresh="onRefresh">
          <!-- 是否加载完 -->
          <van-list v-model="item.upPullLoading" :finished="item.upPullFinished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in item.articles" :key="item.art_id" :title="item.title">
              <template slot="label">
                <van-grid
                v-show="item.cover.type !==0"
                  :border="false" :column-num="3">
                  <van-grid-item v-for="(item,index) in item.cover.images" :key="index">
                    <van-image :src="item" lazy-load/>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>作者:{{item.aut_name}}</span>
                  &nbsp;
                  <span>评论:{{item.comm_count}}</span>
                  &nbsp;
                  <span>时间:{{item.pubdate}}</span>
                  &nbsp;
                </p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import { getChannelUser } from '@/api/channel'
import { mapState } from 'vuex'
import { getArticle } from '@/api/article'
import { setTimeout } from 'timers'

export default {
  name: 'HomeIndex',
  data () {
    return {
      activeIndex: 0,
      channels: [],
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user']),
    // 当前激活的频道，里面有id数据
    activeChannel () {
      return this.channels[this.activeIndex]
    }
  },
  watch: {
    // 凡是可以使用this. 访问的数据都可以使用watch进行监听
    // 比如data数据
    // 'this.$store.state.user'()
    user (newV, oldV) {
      // 重新发送请求获取频道列表数据
      this.loadChannels()
      // 手动触发列表的布尔数据
      // this.activeChannel.upPullFinished = false
      this.activeChannel.upPullLoading = true
      // 更新文章列表数据
      this.loadArticle()
    }
  },
  methods: {
    async loadChannels () {
      // 取本地缓存
      const lsChannels = JSON.parse(window.localStorage.getItem('channels'))
      // 如果已登录
      // 第一种写法
      // if (this.user) {
      //   const data = await getChannelUser()
      //   this.channels = data.channels
      // } else {
      //   // 未登录
      //   if (lsChannels) { // 有本地数据
      //     this.channels = lsChannels
      //   } else { // 没有本地数据
      //     const data = await getChannelUser()
      //     this.channels = data.channels
      //   }
      // }

      // 第二种写法
      const user = this.user
      // 没登录 && 有本地数据
      if (!user && lsChannels) {
        this.channels = lsChannels
      }
      // 没登录 || （没本地 && 登录）
      if ((!user && !lsChannels) || user) {
        const data = await getChannelUser()
        data.channels.forEach(item => {
          item.articles = [] // 用来保存每个频道item自己的文章列表数据
          item.downPullLoading = false // 当前频道下拉状态
          item.upPullLoading = false // 当前频道上拉加载更多
          item.upPullFinished = false // 当前频道加载完毕
          item.timestamp = Date.now() // 用来保存每个频道item自己的文章列表数据对应的时间戳
        })
        this.channels = data.channels
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    // 获取当前激活频道的数据
    async loadArticle () {
      const { id, timestamp } = this.activeChannel
      const data = await getArticle({
        channel_id: id,
        timestamp,
        with_top: 1
      })
      return data
    },
    async onLoad () {
      // 定时器
      await this.$sleep(800)

      let data = []
      // 发送请求获取文章列表数据
      data = await this.loadArticle()
      // 如果没数据 设置时间戳
      if (data.pre_timestamp && data.results.length === 0) {
        // 把返回的历史时间戳赋值给当前激活频道的属性timeatamp
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.loadArticle()
      }
      // 处理加载完事后的效果
      // 1. 停止加载中动画
      // 2. 显示加载完毕
      // 3. 跳出方法
      if (!data.pre_timestamp && !data.results.length) {
        this.activeChannel.upPullFinished = true
        this.activeChannel.upPullLoading = false
        return
      }
      // 更新时间戳
      this.activeChannel.timestamp = data.pre_timestamp

      // data 某个频道对应的文章列表数据
      this.activeChannel.articles.push(...data.results)

      // 取消加载中的动画
      this.activeChannel.upPullLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #fff;
  }
}

// 整体内容距离底部的位置
.channel-tab {
  margin-top: 92px;
  margin-bottom: 100px;
}

// 整体tab的位置
.channel-tab /deep/ .van-tabs__wrap {
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 999;
}
.channel-tab /deep/ .van-tabs__content {
  margin-top: 184px;
}
</style>
