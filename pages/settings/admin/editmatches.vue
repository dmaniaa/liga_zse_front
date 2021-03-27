<template>
  <div>
    <b-row>
      <b-col>
        <b-alert v-if="matches.status.code == 404" show variant="warning">
          {{ matches.status.message }}
        </b-alert>
        <b-alert v-if="matches.status.code == 500" show variant="danger">
          {{ matches.status.message }}
        </b-alert>
        <b-alert :show="showAlert" dismissible fade :variant="type" @dismissed="showAlert=false">
          {{ resp.status.message }}
        </b-alert>
        <b-button variant="success" class="mb-4" @click="add($event.target)">
          Dodaj mecz
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          v-if="matches.status.code == 200"
          dark
          bordered
          sticky-header="calc(100vh - 294px)"
          responsive
          :items="matches.data"
          :fields="fields"
        >
          <template #cell(team_name_1)="data">
            <nuxt-link
              :to="'/settings/admin/teams/'+data.item.team_id_1"
              exact
            >
              {{ data.value }}
            </nuxt-link>
          </template>
          <template #cell(team_name_2)="data">
            <nuxt-link
              :to="'/settings/admin/teams/'+data.item.team_id_2"
              exact
            >
              {{ data.value }}
            </nuxt-link>
          </template>
          <template #cell(actions)="row">
            <b-button
              size="sm"
              class="mb-1"
              variant="primary"
              @click="edit(row.item, row.index, $event.target)"
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
              variant="danger"
              @click="remove(row.item, row.index, $event.target)"
            >
              <b-icon
                icon="x"
                font-scale="1"
              />
              Usuń
            </b-button>
          </template>
        </b-table>
      </b-col>
      <b-modal
        :id="editModal.id"
        :title="editModal.title"
        cancel-title="Anuluj"
        @ok="updateMatch"
      >
        <b-form>
          <b-form-group
            id="team-1-group"
            label="Drużyna 1: "
            label-for="team-1"
          >
            <b-form-select
              id="team-1"
              v-model="editModal.content.team_id_1"
              :options="teamsMapped"
              :state="fieldvalid(editModal.content.team_id_1)"
            />
          </b-form-group>
          <b-form-group
            id="team-2-group"
            label="Drużyna 2: "
            label-for="team-2"
          >
            <b-form-select
              id="team-2"
              v-model="editModal.content.team_id_2"
              :options="teamsMapped"
              :state="fieldvalid(editModal.content.team_id_2)"
            />
          </b-form-group>
          <b-form-group
            id="date-group"
            label="Data: "
            label-for="date"
          >
            <b-form-datepicker
              id="date"
              v-model="editModal.content.date"
              dark
              nav-button-variant="primary"
              :state="fieldvalid(editModal.content.date)"
            />
          </b-form-group>
          <b-form-group
            id="time-group"
            label="Godzina: "
            label-for="time"
          >
            <b-form-timepicker
              id="time"
              v-model="editModal.content.time"
              :state="fieldvalid(editModal.content.time)"
            />
          </b-form-group>
          <b-form-group
            id="team-1-score-group"
            label="Wynik drużyny 1: "
            label-for="team_1_score"
          >
            <b-form-input
              id="team_1_score"
              v-model="editModal.content.team_1_score"
            />
          </b-form-group>
          <b-form-group
            id="team-1-score-group"
            label="Wynik drużyny 2: "
            label-for="team_2_score"
          >
            <b-form-input
              id="team_2_score"
              v-model="editModal.content.team_2_score"
            />
          </b-form-group>
          <b-form-group
            id="note-group"
            label="Adnotacja: "
            label-for="note"
          >
            <b-form-textarea
              id="note"
              v-model="editModal.content.note"
              rows="3"
              max-rows="3"
            />
          </b-form-group>
        </b-form>
      </b-modal>
      <b-modal
        :id="removeModal.id"
        :title="removeModal.title"
        cancel-title="Anuluj"
        ok-variant="danger"
        @ok="removeMatch"
      >
        <p> Czy chcesz usunąć ten mecz? </p>
      </b-modal>
      <b-modal
        :id="addModal.id"
        :title="addModal.title"
        cancel-title="Anuluj"
        @ok="addMatch"
      >
        <b-form>
          <b-form-group
            id="team-1-group"
            label="Drużyna 1: "
            label-for="team-1"
          >
            <b-form-select
              id="team-1"
              v-model="addModal.content.team_id_1"
              :options="teamsMapped"
              :state="fieldvalid(addModal.content.team_id_1)"
            />
          </b-form-group>
          <b-form-group
            id="team-2-group"
            label="Drużyna 2: "
            label-for="team-2"
          >
            <b-form-select
              id="team-2"
              v-model="addModal.content.team_id_2"
              :options="teamsMapped"
              :state="fieldvalid(addModal.content.team_id_2)"
            />
          </b-form-group>
          <b-form-group
            id="date-group"
            label="Data: "
            label-for="date"
          >
            <b-form-datepicker
              id="date"
              v-model="addModal.content.date"
              nav-button-variant="primary"
              :state="fieldvalid(addModal.content.date)"
            />
          </b-form-group>
          <b-form-group
            id="time-group"
            label="Godzina: "
            label-for="time"
          >
            <b-form-timepicker
              id="time"
              v-model="addModal.content.time"
              :state="fieldvalid(addModal.content.time)"
            />
          </b-form-group>
          <b-form-group
            id="note-group"
            label="Adnotacja: "
            label-for="note"
          >
            <b-form-textarea
              id="note"
              v-model="addModal.content.note"
              rows="3"
              max-rows="3"
            />
          </b-form-group>
        </b-form>
      </b-modal>
    </b-row>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const matches = await $axios.$get('/getMatches.php')
    const teams = await $axios.$get('/admin_getTeams.php')
    const teamsMapped = await teams.data.map((item) => {
      const container = {}
      container.value = item.team_id
      container.text = item.team_name
      return container
    })
    return { matches, teamsMapped }
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
          key: 'team_1_score',
          label: 'Wynik drużyny 1'
        },
        {
          key: 'team_2_score',
          label: 'Wynik drużyny 2'
        },
        {
          key: 'note',
          label: 'Adnotacja'
        },
        {
          key: 'actions',
          label: 'Działania'
        }
      ],
      editModal: {
        id: 'edit-modal',
        title: 'Edytuj mecz',
        content: {
          team_id_1: '',
          team_id_2: '',
          date: '',
          time: '',
          team_1_score: '',
          team_2_score: '',
          note: ''
        }
      },
      removeModal: {
        id: 'remove-modal',
        title: 'Usuń mecz',
        content: ''
      },
      addModal: {
        id: 'add-modal',
        title: 'Zaplanuj mecz',
        content: {
          team_id_1: '',
          team_id_2: '',
          date: '',
          time: '',
          team_1_score: '',
          team_2_score: '',
          note: ''
        }
      },
      resp: {
        status: {
          code: 0,
          message: 'Nie powinieneś tego widzieć, za dużo grzebiesz byczq..'
        }
      },
      showAlert: false,
      type: 'danger'
    }
  },
  methods: {
    edit (item, index, button) {
      this.editModal.content = item
      this.$root.$emit('bv::show::modal', this.editModal.id, button)
    },
    remove (item, index, button) {
      this.removeModal.content = item.match_id
      this.$root.$emit('bv::show::modal', this.removeModal.id, button)
    },
    add (button) {
      this.$root.$emit('bv::show::modal', this.addModal.id, button)
    },
    fieldvalid (field) {
      return field.trim().length > 0
    },
    async updateMatch () {
      const resp = await this.$axios.$post('/admin_updateMatch.php', this.editModal.content)
      this.resp = resp
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      this.showAlert = true
      await this.$nuxt.refresh() // pobieramy znów mecze, wincyj kurwa requestów do API, bo czemu nie
    },
    async addMatch () {
      const resp = await this.$axios.$post('/admin_addMatch.php', this.addModal.content)
      this.resp = resp
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      this.showAlert = true
      this.addModal.content = {
        team_id_1: '',
        team_id_2: '',
        date: '',
        time: '',
        team_1_score: '',
        team_2_score: '',
        note: ''
      }
      await this.$nuxt.refresh() // pobieramy znów mecze, wincyj kurwa requestów do API, bo czemu nie
    },
    async removeMatch () {
      const resp = await this.$axios.$post('/admin_removeMatch.php', this.removeModal.content)
      this.resp = resp
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      this.showAlert = true
      await this.$nuxt.refresh() // pobieramy znów mecze, wincyj kurwa requestów do API, bo czemu nie
    }
  }
}
</script>
