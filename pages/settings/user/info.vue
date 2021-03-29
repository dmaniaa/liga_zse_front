<template>
  <b-container
    fluid
    class="text-white"
  >
    <b-alert
      :show="showAlert"
      dismissible
      fade
      :variant="type"
      @dismissed="showAlert=false"
    >
      {{ resp.status.message }}
    </b-alert>
    <b-form @submit="onSubmit">
      <b-form-group
        id="name-group"
        label="Imię: "
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          :state="fieldvalid(form.name)"
        />
        <b-form-invalid-feedback :state="fieldvalid(form.name)">
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="surname-group"
        label="Nazwisko: "
        label-for="surname"
      >
        <b-form-input
          id="surname"
          v-model="form.surname"
          :state="fieldvalid(form.surname)"
        />
        <b-form-invalid-feedback :state="fieldvalid(form.surname)">
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="usrclass-group"
        label="Klasa: "
        label-for="usrclass"
      >
        <b-form-input
          id="usrclass"
          v-model="form.usrclass"
          :state="fieldvalid(form.usrclass)"
        />
        <b-form-invalid-feedback :state="fieldvalid(form.usrclass)">
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="email-group"
        label="E-mail: "
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          disabled
          readonly
        />
        <b-form-invalid-feedback>
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="cm-group"
        label="Nick w LoL: "
        label-for="cm"
      >
        <b-form-input
          id="cm"
          v-model="form.cm"
          :state="fieldvalid(form.cm)"
        />
        <b-form-invalid-feedback :state="fieldvalid(form.cm)">
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="discord-group"
        label="Discord: "
        label-for="discord"
      >
        <b-form-input
          id="discord"
          v-model="form.discord"
          :state="fieldvalid(form.discord)"
        />
        <b-form-invalid-feedback :state="fieldvalid(form.discord)">
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >
        Zmień dane
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  middleware: ['info'], // zawsze aktualne dane użytkownika
  data () {
    return {
      form: {
        nick: this.$auth.user.nick,
        name: this.$auth.user.name,
        surname: this.$auth.user.surname,
        usrclass: this.$auth.user.usrclass,
        email: this.$auth.user.email,
        cm: this.$auth.user.cm,
        discord: this.$auth.user.discord
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
    fieldvalid (field) {
      return field.trim().length > 0
    },
    async onSubmit (event) {
      event.preventDefault()
      for (const field in this.form) {
        if (!this.fieldvalid(this.form[field])) {
          return
        }
      }
      const resp = await this.$axios.$post('/user/update', this.form)
      this.resp = resp
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      this.showAlert = true
      await this.$auth.fetchUser()
    }
  }
}
</script>
