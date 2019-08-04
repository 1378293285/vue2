<template>
  <van-dialog
    closeOnClickOverlay
    :value="value"
    @input="$emit('input')"
    :showConfirmButton="false"
    :showCancelButton="false">
    <van-cell-group v-if="!isReport">
      <van-cell icon="location-o" title="不感兴趣" @click="handleUnlikeActicle( )"/>
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReport=true"/>
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>

    <van-cell-group v-else>
      <!-- 左按钮控制返回上一组结果 -->
      <van-cell icon="arrow-left" @click="isReport=false"/>
      <van-cell title="侵权" icon="location-o" />
      <van-cell title="色情" icon="location-o" />
      <van-cell title="暴力" icon="location-o" />
      <van-cell title="低俗" icon="location-o" />
      <van-cell title="不适" icon="location-o" />
      <van-cell title="错误" icon="location-o" />
      <van-cell title="其他" icon="location-o" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { unLikeArticle } from '@/api/article.js'
export default {
  name: 'MoreAction',
  data () {
    return {
      isReport: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticle: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async handleUnlikeActicle () {
      const { artId } = this.currentArticle
      const data = await unLikeArticle(artId)
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
