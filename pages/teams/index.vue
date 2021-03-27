<template>
  <b-container
    style="height: calc(100vh - 150px);"
    class="text-white"
  >
    <b-row>
      <b-col>
        <h3> Drużyny: </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          v-if="teams.status.code == 200"
          dark
          bordered
          sticky-header="calc(100vh - 170px)"
          responsive
          :items="teams.data"
          :fields="fields"
        >
          <template #cell(team_name)="data">
            <nuxt-link
              :to="'/teams/'+data.item.team_id"
              exact
            >
              {{ data.value }}
            </nuxt-link>
          </template>
        </b-table>
        <b-alert
          v-else-if="teams.status.code == 404"
          show
          variant="warning"
        >
          {{ teams.status.message }}
        </b-alert>
        <b-alert
          v-else-if="teams.status.code == 500"
          show
          variant="danger"
        >
          {{ teams.status.message }}
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const teams = await $axios.$get('/getTeams')
    return { teams }
  },
  data () {
    return {
      fields: [
        {
          key: 'team_name',
          label: 'Nazwa'
        },
        {
          key: 'score',
          label: 'Punkty'
        }
      ]
    }
  },
  head () {
    return {
      title: this.$compConfig.name + ': Drużyny'
    }
  }
}
</script>
