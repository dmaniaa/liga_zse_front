<template>
  <div>
    <b-row>
      <b-col>
        <b-alert v-if="teams.status.code == 404" show variant="warning">
          {{ teams.status.message }}
        </b-alert>
        <b-alert v-if="teams.status.code == 500" show variant="danger">
          {{ teams.status.message }}
        </b-alert>
        <b-alert :show="showAlert" dismissible fade :variant="type" @dismissed="showAlert=false">
          {{ resp.status.message }}
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
          sticky-header="calc(100vh - 230px)"
          responsive
          :items="teams.data.users"
          :fields="fields"
        >
          <template #cell(cm)="data">
            <a :href="'https://eune.op.gg/summoner/userName='+data.value"> {{ data.value }} </a>
          </template>
          <template #cell(actions)="data">
            <b-button size="sm" class="mb-1" variant="primary" @click="edit(data.item, data.index, $event.target)">
              <b-icon icon="pencil" font-scale="0.95" />
              Edytuj
            </b-button>
            <b-button size="sm" class="mb-1" @click="remove(data.item, data.index, $event.target)">
              <b-icon icon="x" font-scale="1" />
              Usuń
            </b-button>
          </template>
        </b-table>
      </b-col>
      <b-modal :id="editModal.id" :title="editModal.title" cancel-title="Anuluj" @ok="updateUser">
        <b-form>
          <b-form-group
            id="name-group"
            label="Imię: "
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="editModal.content.name"
            />
          </b-form-group>
          <b-form-group
            id="surname-group"
            label="Nazwisko: "
            label-for="surname"
          >
            <b-form-input
              id="surname"
              v-model="editModal.content.surname"
            />
          </b-form-group>
          <b-form-group
            id="usrclass-group"
            label="Klasa: "
            label-for="usrclass"
          >
            <b-form-input
              id="usrclass"
              v-model="editModal.content.usrclass"
            />
          </b-form-group>
          <b-form-group
            id="email-group"
            label="E-mail: "
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="editModal.content.email"
              type="email"
            />
          </b-form-group>
          <b-form-group
            id="scope-group"
            label="Uprawnienia: "
            label-for="scope"
          >
            <b-form-checkbox-group
              id="scope"
              v-model="selected"
              :options="options"
              name="scope"
            />
          </b-form-group>
          <b-form-group
            id="cm-group"
            label="Nick w LoL: "
            label-for="cm"
          >
            <b-form-input
              id="cm"
              v-model="editModal.content.cm"
            />
          </b-form-group>
          <b-form-group
            id="discord-group"
            label="Discord: "
            label-for="discord"
          >
            <b-form-input
              id="discord"
              v-model="editModal.content.discord"
            />
          </b-form-group>
        </b-form>
      </b-modal>
      <b-modal :id="removeModal.id" :title="removeModal.title" cancel-title="Anuluj">
        <p> Czy chcesz usunąć tego gracza? (Nie działa) </p>
      </b-modal>
    </b-row>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, route, params }) {
    const teams = await $axios.$get('/admin/getTeam/' + route.params.id)
    return { teams }
  },
  data () {
    return {
      selected: [],
      options: [
        { text: 'Administrator', value: 'admin', disabled: 'true' },
        { text: 'Gracz', value: 'player', disabled: 'true' },
        { text: 'Kapitan', value: 'captain' }
      ],
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
          key: 'usrclass',
          label: 'Klasa'
        },
        {
          key: 'email',
          label: 'Adres e-mail'
        },
        {
          key: 'cm',
          label: 'Nick LoL'
        },
        {
          key: 'discord',
          label: 'Discord'
        },
        {
          key: 'actions',
          label: 'Działania'
        }
      ],
      editModal: {
        id: 'edit-modal',
        title: 'Edytuj gracza',
        content: ''
      },
      removeModal: {
        id: 'remove-modal',
        title: 'Usuń gracza',
        content: ''
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
      this.selected = item.scope
      this.editModal.content = item
      this.$root.$emit('bv::show::modal', this.editModal.id, button)
    },
    remove (item, index, button) {
      this.removeModal.content = item
      this.$root.$emit('bv::show::modal', this.removeModal.id, button)
    },
    async updateUser () {
      this.editModal.content.scope = JSON.stringify(this.selected)
      const resp = await this.$axios.$post('/admin/user/update', this.editModal.content)
      this.resp = resp
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      await this.$nuxt.refresh() // pobieramy znów drużynę, wincyj kurwa requestów do API, bo czemu nie
      this.showAlert = true
    }
  }
}
</script>
