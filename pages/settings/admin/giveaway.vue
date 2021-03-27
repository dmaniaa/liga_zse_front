<template>
  <div>
    <b-row>
      <b-col>
        <b-alert :show="showAlert" dismissible fade :variant="type" @dismissed="showAlert=false">
          {{ resp.status.message }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="success" class="mb-4" @click="enableGiveaway()">
          Włącz giveaway
        </b-button>
        <b-button variant="success" class="mb-4" @click="disableGiveaway()">
          Wyłącz giveaway
        </b-button>
        <b-button variant="success" class="mb-4" @click="reloadGiveaway()">
          Odśwież listę uczestników
        </b-button>
        <b-button variant="success" class="mb-4" @click="selectWinner()">
          Losuj zwycięzcę
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p> Zwycięzca: {{ winner }} </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          v-if="giveaway.status.code == 200"
          dark
          bordered
          sticky-header="calc(100vh - 230px)"
          responsive
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          :items="giveaway.data"
          :fields="fields"
        />
        <b-alert
          v-else-if="giveaway.status.code == 404"
          show
          variant="warning"
        >
          {{ giveaway.status.message }}
        </b-alert>
        <b-alert
          v-else-if="giveaway.status.code == 500"
          show
          variant="danger"
        >
          {{ giveaway.status.message }}
        </b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const giveaway = await $axios.$get('/admin_getGiveaway.php')
    return { giveaway }
  },
  data () {
    return {
      fields: [
        {
          key: 'username',
          label: 'Użytkownik',
          sortable: true
        }
      ],
      resp: {
        status: {
          code: 0,
          message: 'Nie powinieneś tego widzieć, za dużo grzebiesz byczq..'
        }
      },
      showAlert: false,
      type: 'danger',
      sortBy: 'username',
      sortDesc: false,
      winner: 'Nie wybrano',
      giveaway: {
        status: {
          code: 0,
          message: 'Nie powinieneś tego widzieć, za dużo grzebiesz byczq..'
        },
        data: []
      }
    }
  },
  methods: {
    async enableGiveaway () {
      const resp = await this.$axios.$post('/admin_enableGiveaway.php')
      this.resp = resp
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      this.showAlert = true
    },
    async disableGiveaway () {
      const resp = await this.$axios.$post('/admin_disableGiveaway.php')
      this.resp = resp
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      this.showAlert = true
      await this.$nuxt.refresh()
    },
    async reloadGiveaway () {
      await this.$nuxt.refresh()
    },
    async selectWinner () {
      for (let i = 0; i < 4 * this.giveaway.data.length; i++) {
        const winner = this.giveaway.data[Math.floor(Math.random() * this.giveaway.data.length)]
        this.winner = winner.username
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 250)))
      }
    }
  }
}
</script>
