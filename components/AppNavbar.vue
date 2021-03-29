<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/" exact exact-active-class="active">
      <img v-if="$compConfig.logo == true" :src="$compConfig.logoFile" alt="Liga ZSE 2020" class="brand-logo">
      <a v-else> {{ $compConfig.name }} </a>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/news" exact exact-active-class="active">
          Aktualności
        </b-nav-item>
        <b-nav-item to="/matches" exact exact-active-class="active">
          Mecze
        </b-nav-item>
        <b-nav-item to="/teams" exact exact-active-class="active">
          Drużyny
        </b-nav-item>
        <b-nav-item v-if="$compConfig.stage == 'final'" to="/ladder" exact exact-active-class="active">
          Drabinka finałowa
        </b-nav-item>
        <b-nav-item v-else to="/groups" exact exact-active-class="active">
          Grupy
        </b-nav-item>
        <b-nav-item href="/regulamin.pdf">
          Regulamin
        </b-nav-item>
        <b-nav-item-dropdown text="Media społecznościowe" down>
          <b-dropdown-item href="https://www.facebook.com/LIGA-ZSE-2020-118757599975730">
            Facebook
          </b-dropdown-item>
          <b-dropdown-item href="https://discord.gg/gaWs43h">
            Discord
          </b-dropdown-item>
          <b-dropdown-item href="https://www.twitch.tv/zse_esport">
            Twitch
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/contact" exact exact-active-class="active">
          Kontakt
        </b-nav-item>
        <b-nav-item to="/faq" exact exact-active-class="active">
          FAQ
        </b-nav-item>
        <b-nav-item to="/sponsors" exact exact-active-class="active">
          Sponsorzy i podziękowania
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <div v-if="$auth.loggedIn">
          <b-nav-item-dropdown :text="$auth.user.nick" right>
            <b-dropdown-item to="/settings/user/info" exact>
              Ustawienia
            </b-dropdown-item>
            <b-dropdown-item to="/user/logout" exact>
              Wyloguj
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
        <div v-else>
          <b-nav-item-dropdown text="Użytkownik" right>
            <b-dropdown-item to="/user/login" exact>
              Logowanie
            </b-dropdown-item>
            <b-dropdown-item to="/user/reset/request" exact>
              Resetowanie hasła
            </b-dropdown-item>
            <b-dropdown-item v-if="$compConfig.signupOpen == true" to="/user/register" exact>
              Rejestracja
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
</script>

<style>
.brand-logo {
  width: 50px;
  height: 50px;
}
</style>
