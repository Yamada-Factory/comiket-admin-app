<template>
  <section class="section">
    <template>
      <div class="columns is-4 is-multiline">
        <div class="column is-one-fifth" v-for="circle in data" :key="circle.name">
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
            <footer class="card-footer">
              <a href="#" class="card-footer-item"><b-icon icon="thumb-up-outline" type="is-info"></b-icon></a>
            </footer>
          </div>
        </div>
      </div>
    </template>
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
import Event from '@/lib/Event'
import User from '@/lib/User'

export default {
  data() {
    return {
      data: [],
      page: [],
      favorite: [],
    }
  },
  async asyncData({ route, params }) {
    const nextPageParams = Object.assign({}, route.query)
    const previousParams = Object.assign({}, route.query)

    const data = await Event.getCircle(params.id, route.query)

    const favorite = await User.getFavoriteCirlceEvent(params.id, route.query)
    console.log(favorite)


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

    return { data, page, favorite }
  }
}
</script>
