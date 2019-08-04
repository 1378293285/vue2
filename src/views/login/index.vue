<template>
  <div>
    <van-nav-bar title="登录" />
    <form action="/">
      <van-cell-group>
        <van-field
          v-validate="'required|photo'"
          name="photo"
          v-model="user.mobile"
          :error-message="errors.first('photo')"
          placeholder="请输入手机号"
          label="手机号"
          required
        />
        <van-field v-model="user.code" placeholder="请输入密码" label="密码" required />
      </van-cell-group>
      <van-button
        :loading="loginloading"
        type="info"
        block @click.prevent="handLogin">登录</van-button>
    </form>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { login } from '@/api/user.js'
// import { setUser } from '@/utils/auth.js'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        // 默认手机号
        mobile: '13911111111',
        // 默认密码
        code: '246810'
      },
      loginloading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 点击登录
    async handLogin () {
      this.loginloading = true
      // 先验证
      this.$validator.validate().then(async valid => {
        if (!valid) {
          this.loginloading = false
          return
        }
        try {
          const data = await login(this.user)
          this.setUser(data)
          this.loginloading = false
          this.$router.push({
            path: '/'
          })
          // console.log(data);
          // this.$store.commit("setUser", data);
        } catch (error) {
          this.loginloading = false
          console.log(error)
        }
      })
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
</style>
