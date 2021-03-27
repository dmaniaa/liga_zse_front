<template>
  <b-container class="text-white">
    <b-row>
      <b-col>
        <b-alert
          v-if="teams.status.code == 404"
          show
          variant="warning"
        >
          {{ teams.status.message }}
        </b-alert>
        <b-alert
          v-if="teams.status.code == 500"
          show
          variant="danger"
        >
          {{ teams.status.message }}
        </b-alert>
        <h3 v-if="teams.status.code == 200">
          Drużyna: {{ teams.data.team.team_name }}
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h5 v-if="teams.status.code == 200">
          Punkty: {{ teams.data.team.score }}
        </h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          v-if="teams.status.code == 200"
          dark
          bordered
          sticky-header="740px"
          responsive
          :items="teams.data.users"
          :fields="fields"
        >
          <template #cell(cm)="data">
            <a :href="'https://eune.op.gg/summoner/userName='+data.value"> {{ data.value }} </a>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData ({ $axios, route, params }) {
    const teams = await $axios.$get('/getTeam/' + route.params.id)
    return { teams }
  },
  data () {
    return {
      fields: [
        {
          key: 'nick',
          label: 'Nick'
        },
        {
          key: 'name',
          label: 'Imię'
        },
        {
          key: 'surname',
          label: 'Nazwisko'
        },
        {
          key: 'cm',
          label: 'Nick LoL'
        }
      ]
    }
  },
  head () {
    return {
      title: this.$compConfig.name + ': Drużyna ' + this.teams.data.team.team_name
    }
  }
}
</script>
