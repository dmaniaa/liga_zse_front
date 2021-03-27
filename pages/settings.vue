<template>
  <b-container
    fluid
    class="text-white"
  >
    <b-card
      title="Card Title"
      no-body
    >
      <b-card-header header-tag="nav">
        <b-nav
          card-header
          tabs
        >
          <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
          <b-nav-item
            to="/settings/user"
            active-class="active"
          >
            Użytkownik
          </b-nav-item>
          <b-nav-item
            v-if="$auth.hasScope('captain')"
            to="/settings/team"
            active-class="active"
          >
            Drużyna
          </b-nav-item>
          <b-nav-item
            v-if="$auth.hasScope('admin')"
            to="/settings/admin"
            active-class="active"
          >
            Administrator
          </b-nav-item>
        </b-nav>
      </b-card-header>
      <b-card-body>
        <NuxtChild />
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
export default {
  middleware: ['auth'],
  head () {
    return {
      title: this.$compConfig.name + ': Ustawienia'
    }
  }
}
</script>
