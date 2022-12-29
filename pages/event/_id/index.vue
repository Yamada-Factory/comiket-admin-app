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
