<template>
  <section class="section">
    <template>
      <b-table :data="data">
        <b-table-column v-slot="props" field="id" label="ID" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column v-slot="props" field="name" label="イベント名">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column v-slot="props" field="author" label="開催日">
          {{ props.row.date.from }} ~ {{ props.row.date.to }}
        </b-table-column>

        <b-table-column v-slot="props" field="location" label="開催箇所">
          {{ props.row.location.facility }}
        </b-table-column>

        <b-table-column v-slot="props" label="">
          <b-tooltip label="サークル一覧">
            <a :href="'/event/' + props.row.id + '?page=1'">
              <b-icon icon="format-list-text"></b-icon>
            </a>
          </b-tooltip>
        </b-table-column>
      </b-table>
    </template>
  </section>
</template>

<script>
import Event from '~/lib/Event'

export default {
  data() {
    return {
      data: [],
    }
  },
  async asyncData({ route }) {
    const data = await Event.get(route.query)

    return { data }
  }
}
</script>
