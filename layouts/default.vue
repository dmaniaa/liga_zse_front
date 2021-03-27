<template>
  <div>
    <AppNavbar />
    <Nuxt class="mt-3" />
    <CookieConsent />
  </div>
</template>

<style>
body {
  background-image: url("~assets/bg6-pc.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
@media only screen and (max-width: 1000px){
.body {
background-image: url("~assets/bg6-mobile.jpg") !important;
background-repeat: no-repeat;
background-attachment: initial;
}
}
</style>

<script>
export default {
}
</script>
