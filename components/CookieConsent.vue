<template>
  <b-modal
    centered
    ok-only
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    ok-title="Akceptuję"
    title="Zgoda na ciasteczka"
    :visible="!$cookies.get('cookie-consent')"
    @ok="enableConsent"
  >
    <p> Używamy ciasteczek do systemu logowania na stronie. Jeśli nie zgadzasz się na użycie ciastek, opuść stronę. </p>
  </b-modal>
</template>

<script>
export default {
  methods: {
    enableConsent () {
      this.$cookies.set('cookie-consent', 'true', {
        maxAge: 2147483647
      })
    }
  }
}
</script>
