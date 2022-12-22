<template>
  <section class="section">
    <template>
      <template>
        <b-table :data="data">
          <b-table-column v-slot="props" field="id" label="ID" numeric>
            <nuxt-link :to="`/user/circle/${props.row.id}`">{{ props.row.id }}</nuxt-link>
          </b-table-column>

          <b-table-column v-slot="props" field="name" label="サークル名">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column v-slot="props" field="author" label="作家">
            {{ props.row.author }}
          </b-table-column>

          <b-table-column v-slot="props" field="link" label="リンク">
            <b-taglist>
              <template v-for="link in props.row.links">
                <b-tag v-if="link.url != null" :key="link.type" type="is-light">
                  <a :href="link.url" target="__blank">
                    <template v-if="link.type === 'twitter'">
                      <b-icon icon="twitter"></b-icon>
                    </template>
                    <template v-else-if="link.type === 'pixiv'">
                      <img src="https://cloud.githubusercontent.com/assets/10008301/5237429/1e89a588-78c6-11e4-92d4-aa57cb66957a.jpg">
                    </template>
                    <template v-else-if="link.type === 'nicon'">
                      niconico
                      <!-- <img src="https://e7.pngegg.com/pngimages/575/798/png-clipart-niconico-%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E8%B6%85%E4%BC%9A%E8%AD%B0-%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E7%94%9F%E6%94%BE%E9%80%81-%E5%8B%95%E7%94%BB-d%E1%BB%8Bch-v%E1%BB%A5-video-hosting-others-angle-white.png"> -->
                    </template>
                    <template v-else-if="link.type === 'clipstudio'">
                      clipstudio
                      <!-- <img class="is-small" src="https://cdn.icon-icons.com/icons2/3053/PNG/512/clip_studio_paint_macos_bigsur_icon_189480.png"> -->
                    </template>
                    <template v-else-if="link.type === 'website'">
                      <b-icon icon="home"></b-icon>
                    </template>
                  </a>
                </b-tag>
              </template>
            </b-taglist>
          </b-table-column>

          <!-- loginしているとき -->
          <b-table-column v-slot="props" field="color" label="">
              <section>
                <b-icon icon="thumb-up" :style="'color: '+ props.row.color"></b-icon>
              </section>
            </b-table-column>
        </b-table>
      </template>
    </template>

    <div class="container" style="margin-top: 50px;">
      <div class="columns is-mobile is-centered">
        <div class="buttons">
          <b-button type="is-primary" tag="a" :href="'/user/circle?page=' + page.previous">← {{ page.previous }}</b-button>
          <b-button type="is-primary" tag="a" :href="'/user/circle?page=' + page.next">{{ page.next }} →</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import User from '@/lib/User'

export default {
  data() {
    return {
      data: [],
      page: {
      },
      query: {}
    }
  },
  async asyncData({ route, redirect }) {
    const data = await User.getFavoriteCircles(route.query)
    if (data.status) {
      return redirect('/login')
    }

    const previous = parseInt(route.query.page || 1) - 1

    const page = {
      next: parseInt(route.query.page || 1) + 1,
      previous: previous > 0 ? previous : 1
    }

    return { data, page }
  }
}
</script>
