<template>
  <section class="section">
    <template>
      <section>
        <b-message type="is-info" v-show="is_show_info">
          bearer tokenを設定しました
        </b-message>
        <b-field label="Bearer Auth Token">
          <b-input value="Bearer Auth Token" v-model="auth_token"></b-input>
        </b-field>

        <div class="buttons">
          <b-button type="is-success" expanded @click="setToken">設定</b-button>
        </div>
      </section>
    </template>
  </section>
</template>

<script>
import CookieStorage from '@/lib/CookieStorage'
import conf from '@/lib/config'
import User from '~/lib/User'

export default {
  data() {
    return {
      auth_token: CookieStorage.get(conf.API_BEARER_TOKEN_KEY) ?? '',
      is_show_info: false,
    }
  },
  methods: {
    async setToken() {
      CookieStorage.set(conf.API_BEARER_TOKEN_KEY, this.auth_token)

      const user = await User.getUserInfo()
      if (user.status || 200 === 401) {
        this.danger()
      } else {
        this.success(user.name)
      }
      console.log(user)
    },
    success(userName) {
      this.$buefy.toast.open({
        message: userName + 'ログインに成功しました',
        type: 'is-success',
        duration: 5000,
      })
    },
    danger() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `ログインできませんでした`,
        type: 'is-danger'
      })
    },
  },
}
</script>
