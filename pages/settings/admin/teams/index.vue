<template>
  <b-row>
    <b-col>
      <b-table
        v-if="teams.status.code == 200"
        dark
        bordered
        sticky-header="calc(100vh - 230px)"
        responsive
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        :items="teams.data"
        :fields="fields"
      >
        <template #cell(actions)="data">
          <b-button
            size="sm"
            class="mb-1"
            variant="primary"
            @click="$router.push('teams/'+data.item.team_id)"
          >
            <b-icon
              icon="pencil"
              font-scale="0.95"
            />
            Edytuj
          </b-button>
          <b-button
            size="sm"
            class="mb-1"
            @click="remove(data.item, data.index, $event.target)"
          >
            <b-icon
              icon="x"
              font-scale="1"
            />
            Usuń
          </b-button>
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
    <b-modal
      :id="removeModal.id"
      :title="removeModal.title"
    >
      <p> Czy chcesz usunąć tą drużynę? (Nie działa) </p>
    </b-modal>
  </b-row>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const teams = await $axios.$get('/getTeams.php')
    return { teams }
  },
  data () {
    return {
      sortBy: 'team_id',
      sortDesc: false,
      fields: [
        {
          key: 'team_id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'team_name',
          label: 'Nazwa'
        },
        {
          key: 'actions',
          label: 'Działania'
        }
      ],
      removeModal: {
        id: 'remove-modal',
        title: 'Usuń drużynę',
        content: ''
      }
    }
  },
  methods: {
    remove (item, index, button) {
      this.removeModal.content = item
      this.$root.$emit('bv::show::modal', this.removeModal.id, button)
    }
  }
}
</script>
