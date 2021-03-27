<template>
  <b-container class="text-white">
    <b-row>
      <b-col>
        <h2> Nasi sponsorzy: </h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        md="12"
        lg="3"
        xl="3"
        class="mb-3"
      />
      <b-col
        md="12"
        lg="3"
        xl="3"
        class="mb-3"
      >
        <b-card
          title="Microsoft Azure"
          img-src="~/assets/azure.png"
          img-alt="Azure"
        >
          <b-card-text>
            Sponsor serwerów dla strony
          </b-card-text>
        </b-card>
      </b-col>
      <b-col
        md="12"
        lg="3"
        xl="3"
        class="mb-3"
      >
        <b-card
          title="Ectron"
          img-src="~/assets/ectron-500x500.png"
          img-alt="Ectron"
        >
          <b-card-text>
            Sposor nagród
          </b-card-text>
        </b-card>
      </b-col>
      <b-col
        md="12"
        lg="3"
        xl="3"
        class="mb-3"
      />
    </b-row>
    <b-row>
      <b-col>
        <h2> Specjalne podziękowania: </h2>
        <ul>
          <li> mgr inż. Tadeusz Truszkowski - utworzenie domeny dla strony internetowej </li>
          <li> Dyrekcja Zespołu Szkół Energetycznych - zgoda na wydarzenie </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head () {
    return {
      title: this.$compConfig.name + ': Sponsorzy'
    }
  }
}
</script>
