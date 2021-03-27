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
        id="title-group"
        label="Tytuł postu: "
        label-for="name"
      >
        <b-form-input
          id="title"
          v-model="form.title"
          :state="titlevalid"
        />
        <b-form-invalid-feedback :state="titlevalid">
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="content-group"
        label="Post: "
        label-for="content"
      >
        <b-form-textarea
          id="content"
          v-model="form.content"
          rows="4"
          max-rows="4"
          :state="contentvalid"
        />
        <b-form-invalid-feedback :state="contentvalid">
          Pole nie może być puste
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >
        Wyślij post
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      },
      resp: {
        status: {
          code: 0,
          message: ''
        }
      },
      showAlert: false,
      type: 'danger'
    }
  },
  computed: {
    titlevalid () {
      return this.form.title.trim().length > 0
    },
    contentvalid () {
      return this.form.content.trim().length > 0
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      if (!this.titlevalid) {
        return false
      }
      if (!this.contentvalid) {
        return false
      }
      const resp = await this.$axios.$post('/sendNews.php', this.form)
      this.resp = resp
      // console.log(resp)
      // await alert(JSON.stringify(this.form))
      if (resp.status.code === '200') {
        this.type = 'success'
      }
      this.showAlert = true
    }
  }
}
</script>
