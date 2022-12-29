<template>
  <section class="section">
    <template>
      <section class="container">
        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
          <template #trigger="props">
            <div class="card-header" role="button" aria-controls="contentIdForA11y3" :aria-expanded="props.open">
              <p class="card-header-title">
                検索オプション
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                </b-icon>
              </a>
            </div>
          </template>

          <div class="card-content">
            <div class="content">
              <b-field grouped group-multiline>
                <b-select placeholder="ジャンル" v-model="search.genre">
                  <option value=""></option>
                  <option v-for="(genre, index) in genres" :key="index">
                    {{ genre }}
                  </option>
                </b-select>
                <b-select placeholder="ホール" v-model="search.hall">
                  <option value=""></option>
                  <option v-for="(hall, index) in halls" :key="index">
                    {{ hall }}
                  </option>
                </b-select>
                <b-select placeholder="ブロック" v-model="search.block">
                  <option value=""></option>
                  <option v-for="(block, index) in blocks" :key="index">
                    {{ block }}
                  </option>
                </b-select>
                <b-select placeholder="優先度" v-model="search.sort_by_priority">
                  <option value="desc">優先度降順</option>
                  <option value="asc">優先度昇順</option>
                </b-select>
                <b-select placeholder="通販フラグ" v-model="search['e-commerce_flag']">
                  <option value="">考慮しない</option>
                  <option value="0">false</option>
                  <option value="1">true</option>
                </b-select>
              </b-field>
              <b-field>
                <b-field label="limit">
                  <b-numberinput v-model="search.limit"></b-numberinput>
                  <template #message>
                    <div>DBで検索したあとフィルターするのでフィルター条件を入力するときは大きめの数字を設定</div>
                  </template>
                </b-field>
              </b-field>
            </div>
          </div>
          <footer class="card-footer">
            <b-button class="card-footer-item" @click="goSearch()">検索</b-button>
          </footer>
        </b-collapse>
      </section>
      <template>
        <b-table :data="data" detailed>
          <b-table-column v-slot="props" field="id" label="ID" numeric>
            <template v-if="showDetailIcon">
              <nuxt-link :to="`/user/circle/${props.row.id}`">{{ props.row.id }}</nuxt-link>
            </template>
            <template v-else>
              <a @click="props.toggleDetails(props.row)">
                <nuxt-link :to="`/user/circle/${props.row.id}`">{{ props.row.id }}</nuxt-link>
              </a>
            </template>
          </b-table-column>

          <b-table-column v-slot="props" field="name" label="作家">
            {{ props.row.name }} / {{ props.row.author }}
          </b-table-column>

          <b-table-column v-slot="props" field="place" label="配置">
            {{ props.row.info.day }} {{ props.row.info.hall }} {{ props.row.info.block }} {{ props.row.info.space }}
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
                      <img
                        src="https://cloud.githubusercontent.com/assets/10008301/5237429/1e89a588-78c6-11e4-92d4-aa57cb66957a.jpg">
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
              <b-icon icon="thumb-up" :style="'color: ' + props.row.color"></b-icon>
            </section>
          </b-table-column>

          <template #detail="props">
            <div class="columns is-mobile">
              <div class="column">
                <figure class="media-left">
                  <img class="image" :src="'https://s3-yamada-01.misosiru.men/comiket-app-dev' + props.row.info.images[0] ?? ''">
                </figure>
              </div>
              <div class="column">
                <b-field label="ジャンル" horizontal>
                  {{ props.row.info.genre }}
                </b-field>
                <b-field label="通販フラグ" horizontal>
                  {{ props.row['e-commerce_flag'] }}
                </b-field>
                <b-field label="優先度" horizontal>
                  {{ props.row.priority }}
                </b-field>
                <b-field label="予算" horizontal>
                  {{ props.row.price }}
                </b-field>
                <b-field label="コメント" horizontal>
                  {{ props.row.comment }}
                </b-field>
              </div>
            </div>
          </template>
        </b-table>
      </template>
    </template>

    <div class="container" style="margin-top: 50px;">
      <div class="columns is-mobile is-centered">
        <div class="buttons">
          <b-button type="is-primary" tag="a" @click="previousPage()">← {{ page.previous }}</b-button>
          <b-button type="is-primary" tag="a" @click="nextPage()">{{ page.next }} →</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Event from '@/lib/Event'
import User from '@/lib/User'

export default {
  data() {
    return {
      data: [],
      page: {
      },
      query: {},
      params: {},
      showDetailIcon: true,
      search: {},
      genres: [],
      halls: [],
      blocks: [],
    }
  },
  async asyncData({ params, route, redirect }) {
    const data = await User.searchFavoriteCircles(params.id, route.query)
    if (data.status) {
      return redirect('/login')
    }

    const previous = parseInt(route.query.page || 1) - 1

    const page = {
      next: parseInt(route.query.page || 1) + 1,
      previous: previous > 0 ? previous : 1
    }

    const search = route.query

    const genres = await Event.getGenre(params.id)
    const halls = await Event.getHall(params.id)
    const blocks = await Event.getBlock(params.id)


    return { params, data, page, genres, halls, blocks, search }
  },
  methods: {
    isObject(value) {
      console.log(value)
      return value !== null && typeof value === 'object'
    },
    goSearch() {
      Object.keys(this.search).forEach(key => {
        if (this.search[key].length === 0) delete this.search[key];
      });
      const url = '/user/circle/event/' + String(this.params.id) + '?' + new URLSearchParams(this.search).toString()
      window.location.href = url
      return this.$router.push(url)
    },
    previousPage() {
      Object.keys(this.search).forEach(key => {
        if (this.search[key].length === 0) delete this.search[key];
      });
      this.search.page = this.page.previous
      const url = '/user/circle/event/' + String(this.params.id) + '?' + new URLSearchParams(this.search).toString()

      window.location.href = url
      return this.$router.push(url)
    },
    nextPage() {
      Object.keys(this.search).forEach(key => {
        if (this.search[key].length === 0) delete this.search[key];
      });
      this.search.page = this.page.next
      const url = '/user/circle/event/' + String(this.params.id) + '?' + new URLSearchParams(this.search).toString()

      window.location.href = url
      return this.$router.push(url)
    },
  },
}
</script>
