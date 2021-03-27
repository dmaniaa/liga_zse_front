<template>
  <b-container style="height: calc(100vh - 150px)" class="text-white">
    <b-row>
      <b-col>
        <h3>Lista meczy:</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          v-if="matches.status.code == 200"
          dark
          bordered
          sticky-header="calc(100vh - 170px)"
          responsive
          :items="matches.data"
          :fields="fields"
        >
          <template #cell(team_name_1)="data">
            <nuxt-link :to="'/teams/' + data.item.team_id_1" exact>
              {{ data.value }}
            </nuxt-link>
          </template>
          <template #cell(team_name_2)="data">
            <nuxt-link :to="'/teams/' + data.item.team_id_2" exact>
              {{ data.value }}
            </nuxt-link>
          </template>
        </b-table>
        <b-alert v-else-if="matches.status.code == 404" show variant="warning">
          {{ matches.status.message }}
        </b-alert>
        <b-alert v-else-if="matches.status.code == 500" show variant="danger">
          {{ matches.status.message }}
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const matches = await $axios.$get('/getMatches')
    return { matches }
  },
  data () {
    return {
      fields: [
        {
          key: 'team_name_1',
          label: 'Drużyna 1'
        },
        {
          key: 'team_name_2',
          label: 'Drużyna 2'
        },
        {
          key: 'date',
          label: 'Data'
        },
        {
          key: 'time',
          label: 'Godzina'
        },
        {
          key: 'team_id_1_score',
          label: 'Wynik drużyny 1'
        },
        {
          key: 'team_id_2_score',
          label: 'Wynik drużyny 2'
        },
        {
          key: 'note',
          label: 'Adnotacja'
        }
      ]
    }
  },
  head () {
    return {
      title: this.$compConfig.name + ': Mecze'
    }
  }
}
</script>
