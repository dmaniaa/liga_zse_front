<template>
  <b-row>
    <b-col lg="2">
      <b-nav
        vertical
        pills
      >
        <b-nav-item
          to="/settings/user/info"
          exact
          exact-active-class="active"
        >
          Informacje
        </b-nav-item>
        <b-nav-item
          v-if="!$auth.hasScope('player')"
          to="/settings/user/jointeam"
          exact
          exact-active-class="active"
        >
          Dołącz do drużyny
        </b-nav-item>
        <b-nav-item
          v-if="!$auth.hasScope('player')"
          to="/settings/user/createteam"
          exact
          exact-active-class="active"
        >
          Utwórz drużynę
        </b-nav-item>
        <b-nav-item
          v-if="$auth.hasScope('player')"
          to="/settings/user/leaveteam"
          exact
          exact-active-class="active"
        >
          Opuść drużynę
        </b-nav-item>
      </b-nav>
    </b-col>
    <b-col>
      <NuxtChild />
    </b-col>
  </b-row>
</template>

<script>
</script>
