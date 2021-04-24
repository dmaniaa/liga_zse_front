<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-jumbotron
          v-if="$compConfig.signupOpen == true"
          :header="$compConfig.name"
          lead="Zapisy otwarte!"
        />
        <b-jumbotron
          v-if="$compConfig.signupOpen == false"
          :header="$compConfig.name"
          lead="Zapisy zamknięte!"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p class="text-white">
          {{ $compConfig.description }}
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-embed
          v-if="$compConfig.showTrailer == true"
          type="embed"
          aspect="16by9"
          src="https://www.youtube.com/embed/UmSMH3pEz9k"
          allowfullscreen
          height="100px"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head () {
    return {
      title: this.$compConfig.name + ': Główna'
    }
  }
}
</script>
<style>
</style>
