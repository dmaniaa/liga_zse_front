<template>
  <b-row>
    <b-col lg="2">
      <b-nav
        vertical
        pills
        class="mb-1"
      >
        <b-nav-item
          to="/settings/admin/sendnews"
          exact
          exact-active-class="active"
        >
          Wyślij post
        </b-nav-item>
        <b-nav-item
          to="/settings/admin/editmatches"
          exact
          exact-active-class="active"
        >
          Edytuj mecze
        </b-nav-item>
        <b-nav-item
          to="/settings/admin/teams"
          active-class="active"
        >
          Zarządzaj drużynami i uczestnikami
        </b-nav-item>
        <b-nav-item
          to="/settings/admin/giveaway"
          active-class="active"
        >
          Zarządzaj giveaway na Twitch
        </b-nav-item>
      </b-nav>
    </b-col>
    <b-col>
      <NuxtChild />
    </b-col>
  </b-row>
</template>

<script>
export default {
  middleware: 'admin', // to pobiera dane użytkownika przy każdej nawigacji, nie tak miało być ale jest bezpieczniej
  head () {
    return {
      title: this.$compConfig.name + ': Ustawienia administracji'
    }
  }
}
</script>
