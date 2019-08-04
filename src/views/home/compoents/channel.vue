<template>
  <!-- 模态框 -->
  <van-popup :value="value" @input="$emit('input')" v-model="show" position="bottom" :style="{height: '95%'}"></van-popup>
</template>

<script>
export default {
  name: 'ChannelIndex',
  data () {
    return {
      show: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
