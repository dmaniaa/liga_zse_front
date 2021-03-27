<script>
export default {
  middleware: 'auth',
  async asyncData ({ $auth }) {
    await $auth.logout()
  }
}
</script>
