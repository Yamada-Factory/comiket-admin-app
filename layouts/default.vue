<template>
  <div>
    <b-navbar class="is-primary">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Comiket Admin
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item href="/">
          TOP
        </b-navbar-item>
        <b-navbar-item href="/circle/list">
          サークル一覧
        </b-navbar-item>
        <b-navbar-item href="/event/list">
          イベント一覧
        </b-navbar-item>
        <b-navbar-dropdown label="お気に入り">
          <b-navbar-item href="/user/circle/">
            サークル一覧
          </b-navbar-item>
          <b-navbar-item href="/user/circle/event">
            イベント一覧
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <!-- <a class="button is-primary">
              <strong>Sign up</strong>
            </a> -->
            <a class="button is-primary" href="/login">
              Log in
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="container column is-10">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'circle',
          icon: 'lightbulb',
          to: { name: 'circle/list' },
        },
        {
          title: '設定',
          icon: 'cog',
          to: { name: 'login' },
        },
      ],
    }
  },
}
</script>
