<template>
  <van-dialog
    closeOnClickOverlay
    :value="value"
    @input="$emit('input')"
    :showConfirmButton="false"
    :showCancelButton="false">
    11111111
  </van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
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
