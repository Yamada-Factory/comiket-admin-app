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
import conf from '@/lib/config'

export default {
    data() {
        return {
            auth_token: this.$cookies.get(conf.API_BEARER_TOKEN_KEY) ?? '',
            is_show_info: false,
        }
    },
    methods: {
        setToken() {
            this.$cookies.set(conf.API_BEARER_TOKEN_KEY, this.auth_token)
        },
    },
}
</script>
