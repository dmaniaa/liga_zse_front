<template>
  <b-container
    style="height: calc(100vh - 150px);"
    class="text-white overflow-auto"
  >
    <div v-if="news.status.code == 200">
      <b-row
        v-for="arti in news.data"
        :key="arti.id"
      >
        <b-col>
          <b-card
            :title="arti.title"
            :sub-title="arti.nick +' (' + arti.full_name + ') ' + arti.date + ' ' +arti.time"
            class="mb-2"
          >
            <b-card-text>
              {{ arti.content }}
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-alert
      v-else-if="news.status.code == 404"
      show
      variant="warning"
    >
      {{ news.status.message }}
    </b-alert>
    <b-alert
      v-else-if="news.status.code == 500"
      show
      variant="danger"
    >
      {{ news.status.message }}
    </b-alert>
  </b-container>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const news = await $axios.$get('/getNews')
    return { news }
  },
  head () {
    return {
      title: this.$compConfig.name + ': Aktualności'
    }
  }
}
</script>
