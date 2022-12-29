<template>
  <section class="section">
    <div>
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
                <b-select placeholder="スペース" v-model="search.space">
                  <option value=""></option>
                  <option v-for="(space, index) in spaces" :key="index">
                    {{ space }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
          <footer class="card-footer">
            <b-button class="card-footer-item" @click="goSearch()">検索</b-button>
          </footer>
        </b-collapse>
      </section>
    </div>

    <div class="container" style="margin-top: 50px;">
      <div class="columns is-4 is-multiline is-mobile">
        <div class="column is-6-mobile is-3-tablet is-3-desktop is-2-fullhd" v-for="circle in data" :key="circle.name">
          <div class="card-image" v-if="circle.images && circle.images.length">
            <figure class="image">
              <img :src="'https://s3-yamada-01.misosiru.men/comiket-app-dev' + circle.images[0]" alt="Placeholder image">
            </figure>
          </div>
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button" aria-controls="contentIdForA11y3">
              <p class="card-header-title">
                {{ circle.author || 'null' }}
              </p>
            </div>
            <div class="card-content">
              <div class="content">
                <template>
                  <b-field grouped>
                    <b-taglist>
                      <b-tag type="is-link is-light">{{ circle.day }}-{{ circle.hall }}-{{ circle.block }}-{{ circle.space }}</b-tag>
                      <b-tag type="is-info is-light">{{ circle.genre }}</b-tag>
                    </b-taglist>
                  </b-field>
                  <!-- <br> -->
                  <!-- {{ circle.description }} -->
                </template>
              </div>
            </div>
            <footer class="card-footer" v-show="isAuth">
              <template v-if="circle.isFavorite">
                <a href="#" class="card-footer-item">
                  <b-icon icon="thumb-up" type="is-danger"></b-icon>
                </a>
              </template>
              <template v-else>
                <a class="card-footer-item" @click="addFavoriteCircle(circle.circle_id)">
                  <b-icon icon="thumb-up-outline" type="is-info"></b-icon>
                </a>
              </template>
            </footer>
            <footer class="card-footer">
              <b-button @click="circle.showModal = true" class="card-footer-item">詳細モーダル</b-button>
            </footer>
            <footer class="card-footer" v-show="isAuth">
              <nuxt-link :to="`/user/circle/${circle.id}`" class="card-footer-item">詳細画面</nuxt-link>
            </footer>
            <b-modal v-model="circle.showModal" :width="640" scroll="keep">
              <div class="card">
                <!-- <div class="card-image">
                  <div class="card-image" v-if="circle.images && circle.images.length">
                    <figure class="image">
                      <img :src="'https://s3-yamada-01.misosiru.men/comiket-app-dev' + circle.images[0]" alt="Placeholder image">
                    </figure>
                  </div>
                </div> -->
                <div class="card-content">
                  <div class="columns is-mobile is-3 is-multiline" v-if="circle.images && circle.images.length">
                    <img
                      :src="'https://s3-yamada-01.misosiru.men/comiket-app-dev' + image"
                      alt="Placeholder image"
                      class="column is-6-mobile is-3-tablet is-2-desktop"
                      v-for="(image, index) in circle.images" :key="index">
                  </div>

                  <div class="content">
                    <b-field label="サークル名">
                      <!-- <b-input :value="data.author" readonly></b-input> -->
                      <p>{{ circle.name }}</p>
                    </b-field>

                    <b-field label="作家">
                      <p>{{ circle.author }}</p>
                    </b-field>

                    <b-field label="配置場所">
                      <p>{{ circle.day }} {{ circle.hall }} {{ circle.bloack }} {{ circle.space }}</p>
                    </b-field>

                    <b-field label="ジャンル">
                      <p>{{ circle.genre }}</p>
                    </b-field>

                    <b-field label="説明文">
                      <p>{{ circle.description }}</p>
                    </b-field>

                    <b-field label="リンク">
                      <b-taglist>
                        <template v-for="link in circle.links">
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
                    </b-field>
                  </div>
                </div>
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top: 50px;">
      <div class="columns is-mobile is-centered">
        <div class="buttons">
          <b-button type="is-primary" tag="a" :href="page.previous.url">← {{ page.previous.count }}</b-button>
          <b-button type="is-primary" tag="a" :href="page.next.url">{{ page.next.count }} →</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CookieStorage from '@/lib/CookieStorage'
import Event from '@/lib/Event'
import User from '@/lib/User'

export default {
  data() {
    return {
      data: [],
      page: [],
      favorite: [],
      isAuth: CookieStorage.get('is_auth') || false,
      favoriteCircleIds: [],
      eventId: 0,
      search: {},
      genres: [],
      halls: [],
      blocks: [],
      spaces: [],
    }
  },
  async asyncData({ route, params }) {
    const nextPageParams = Object.assign({}, route.query)
    const previousParams = Object.assign({}, route.query)

    const data = await Event.getCircle(params.id, route.query)
    const eventId = params.id

    let favorite = await User.getFavoriteCirlceEvent(params.id, route.query)
    if (favorite.status) {
      favorite = []
    }
    const favoriteCircleIds = favorite.map(p => parseInt(p.circle_id))

    for (let i = 0; i < data.length; i++) {
      if (favoriteCircleIds.includes(data[i].circle_id)) {
        data[i].isFavorite = true
      } else {
        data[i].isFavorite = false
      }
      data[i].showModal = false
    }


    const previous = parseInt(route.query.page || 1) - 1
    nextPageParams.page = parseInt(route.query.page || 1) + 1
    previousParams.page = previous > 0 ? previous : 1

    const page = {
      next: {
        count: parseInt(route.query.page || 1) + 1,
        url: route.path + '?' + new URLSearchParams(nextPageParams).toString(),
      },
      previous: {
        count: previous > 0 ? previous : 1,
        url: route.path + '?' + new URLSearchParams(previousParams).toString(),
      }
    }

    const search = route.query

    const genres = await Event.getGenre(params.id)
    const halls = await Event.getHall(params.id)
    const blocks = await Event.getBlock(params.id)
    const spaces = await Event.getSpace(params.id)

    return { data, page, favorite, favoriteCircleIds, eventId, search, genres, halls, blocks, spaces }
  },
  methods: {
    async refreshFavorite() {
      const favorite = await User.getFavoriteCirlceEvent(this.eventId)
      this.favoriteCircleIds = favorite.map(p => parseInt(p.circle_id))

      for (let i = 0; i < this.data.length; i++) {
        if (this.favoriteCircleIds.includes(this.data[i].circle_id)) {
          this.data[i].isFavorite = true
        } else {
          this.data[i].isFavorite = false
        }
      }
    },
    async addFavoriteCircle(circleId) {
      const response = await User.addFavoriteCircleEvent(this.eventId, {
        'circle_id': parseInt(circleId),
        'event_id': parseInt(this.eventId),
      })
      if ((response.status || 200) === 200) {
        this.success()
      } else {
        this.danger()
      }

      this.refreshFavorite()
    },
    success() {
      this.$buefy.toast.open({
        message: '登録に成功しました',
        type: 'is-success',
        duration: 5000,
      })
    },
    danger() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `登録に失敗しました`,
        type: 'is-danger'
      })
    },
    goSearch() {
      Object.keys(this.search).forEach(key => {
        if (this.search[key].length === 0) delete this.search[key];
      });
      const url = '/event/' + String(this.eventId) + '?' + new URLSearchParams(this.search).toString()
      window.location.href = url
      return this.$router.push(url)
    }
  },
}
</script>
