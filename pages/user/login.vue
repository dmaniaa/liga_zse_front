<template>
  <b-container class="text-white">
    <b-row>
      <b-col
        md="12"
        lg="4"
        xl="4"
      />
      <b-col
        md="12"
        lg="4"
        xl="4"
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
            id="uname-group"
            label="Nazwa użytkownika:"
            label-for="uname"
          >
            <b-form-input
              id="uname"
              v-model="form.uname"
              :state="unamevalid"
              required
            />
            <b-form-invalid-feedback :state="unamevalid">
              Nazwa nie może być pusta!
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="password-group"
            label="Hasło:"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              :state="passwordvalid"
              required
            />
            <b-form-invalid-feedback :state="passwordvalid">
              Hasło nie może być puste!
            </b-form-invalid-feedback>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
          >
            Zaloguj
          </b-button>
        </b-form>
      </b-col>
      <b-col
        md="12"
        lg="4"
        xl="4"
      />
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      form: {
        uname: '',
        password: ''
      },
      resp: {
        status: {
          code: 0,
          message: ''
        }
      },
      showAlert: false,
      type: 'warning'
    }
  },
  computed: {
    unamevalid () {
      return this.form.uname.trim().length > 0
    },
    passwordvalid () {
      return this.form.password.trim().length > 0
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      if (this.form.uname.trim().length < 1) {
        return false
      }
      if (this.form.password.trim().length < 1) {
        return false
      }
      const resp = await this.$auth.loginWith('local', { data: this.form })
      this.resp = resp.data
      if (resp.data.status.code !== '200') {
        this.showAlert = true
      }
    }
  },
  head () {
    return {
      title: this.$compConfig.name + ': Logowanie'
    }
  }
}
</script>
