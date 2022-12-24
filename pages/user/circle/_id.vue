<template>
  <section class="section">
    <template>
      <template>
        <section>
          <b-tabs v-model="activeTab">
            <b-tab-item label="サークル基本情報">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <section>
                      <b-field label="サークル名">
                        <!-- <b-input :value="data.author" readonly></b-input> -->
                        <p>{{ data.name }}</p>
                      </b-field>

                      <b-field label="作家">
                        <p>{{ data.author }}</p>
                      </b-field>

                      <b-field label="リンク">
                        <b-taglist>
                          <template v-for="link in data.links">
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
                    </section>
                  </div>
                </div>
              </div>

              <br>

              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div class="content">
                      <p class="title is-6">お気に入り</p>
                      <div class="columns">
                        <b-radio-button v-for="color in colors" :key="color.name" v-model="selectColor" :native-value="color.value" type="is-info" class="column is-2" @input="updateFavoriteColor">
                          <b-icon icon="thumb-up" :style="'color: ' + color.value"></b-icon>
                        </b-radio-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab-item>

            <b-tab-item v-for="event in data.event" :key="event.id" label="イベント参加情報" >
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    {{ event.name }}
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <section>
                      <b-field label="サークル名">
                        <!-- <b-input :value="data.author" readonly></b-input> -->
                        <p>{{ data.name }}</p>
                      </b-field>

                      <b-field label="作家">
                        <p>{{ data.author }}</p>
                      </b-field>

                      <b-field label="配置場所">
                        <p>{{ event.info.day }} {{ event.info.hall }} {{ event.info.bloack }} {{ event.info.space }}</p>
                      </b-field>

                      <b-field label="ジャンル">
                        <p>{{ event.info.genre }}</p>
                      </b-field>

                      <b-field label="説明文">
                        <p>{{ event.info.description }}</p>
                      </b-field>

                      <div class="columns is-mobile is-1 is-multiline" v-if="images[event.name] && images[event.name].length">
                        <img
                          :src="'https://s3-yamada-01.misosiru.men/comiket-app-dev' + image"
                          alt="Placeholder image"
                          class="column is-6-mobile is-3-tablet is-2-desktop"
                          v-for="(image, index) in images[event.name]" :key="index">
                      </div>
                    </section>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="card-footer-item">
                    <b-field label="優先度">
                        <b-numberinput v-model="form[event.name].priority"></b-numberinput>
                    </b-field>
                  </div>
                  <div class="card-footer-item">
                    <b-field>
                      <b-checkbox :value="form[event.name].isEc">
                          通販フラグ
                      </b-checkbox>
                    </b-field>
                  </div>
                </div>
              </div>
            </b-tab-item>
          </b-tabs>
        </section>
      </template>

    </template>
  </section>
</template>

<script>
import User from '@/lib/User'

export default {
  data() {
    return {
      data: [],
      colors: [
        {
          id: 1,
          value: '#000000',
          name: '紫黒',
        },
        {
          id: 2,
          value: '#007b43',
          name: '常磐色',
        },
        {
          id: 3,
          value: '#c53d43',
          name: '赤紅',
        },
        {
          id: 4,
          value: '#e6b422',
          name: '黄金',
        },
        {
          id: 5,
          value: '#aa4c8f',
          name: '梅紫',
        },
      ],
      activeTab: 0,
      showBooks: false,
      selectColor: '',
      query: {},
      radioButton: '',
      images: {},
      form: {},
      circleId: 0,
    }
  },
  methods: {
    success(message) {
      this.$buefy.toast.open({
        message,
        type: 'is-success',
        duration: 5000,
      })
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message,
        type: 'is-danger'
      })
    },
    async updateFavoriteColor() {
      const data = await User.updateFavoriteCircle({
        'circle_id': this.circleId,
        'color': this.selectColor
      })
      if (data.status) {
        return this.danger('更新失敗しました')
      }
      return this.success('更新')
    }
  },
  async asyncData({ route, params, redirect }) {
    const data = await User.getFavoriteCircleDetail(params.id, route.query)
    if (data.status) {
      return redirect('/login')
    }
    console.log(data)

    const images = {}
    const form = {}

    data.event.forEach(event => {
      images[event.name] = []
      form[event.name] = {
        'priority': event.priority,
        'isEc': event['e-commerce_flag'],
      }
      event.info.images.forEach(image => {
        if (image.length) {
          images[event.name].push(image)
        } else if ('既定表示画像' in image && 'サムネイル画像' in image) {
          if (image['既定表示画像']) {
            images[event.name].push(image['既定表示画像'])
          } else if (image['サムネイル画像']) {
            images[event.name].push(image['サムネイル画像'])
          }
        }
      });
    })

    const selectColor = data.color

    const query = route.query

    const circleId = params.id

    return { data, query, selectColor, images, form, circleId }
  }
}
</script>
