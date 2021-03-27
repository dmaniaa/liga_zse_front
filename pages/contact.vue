<template>
  <b-container
    fluid
    class="text-white"
  >
    <b-jumbotron
      header="Kontakt z nami"
      lead="Masz z czymś problem? Potrzebujesz rozjaśnienia jakiejś sprawy? A może znalazłaś(eś) błąd? Skontaktuj się z osobą z danego działu ▼"
    >
      <h6>► Zapisy, wpłaty, organizacja, kwestie dot. regulaminu ◄</h6>
      <p>
        <img
          v-b-popover.hover.top="'katrana#7705'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> <a
          v-b-popover.hover.top="'Kliknij, aby na niego przejść.'"
          title="Facebook"
          href="https://www.facebook.com/profile.php?id=100009631682899"
        > <img src="~/assets/fb.png"> </img> </a> Katarzyna Pietras
      </p>
      <h6>► Kwestie techniczne dot. strony internetowej do zapisów ◄</h6>
      <p>
        <img
          v-b-popover.hover.top="'Leninface#5778'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Daniel Mania
      </p>
      <h6>► Kwestie techniczne dot. rozgrywki oraz serwera na finały ◄</h6>
      <p>
        <img
          v-b-popover.hover.top="'Pablis#4252'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Paweł Strużyński
      </p>
      <h6>► Kwestie techniczne dot. serwera Discord i komunikacji w czasie rozgrywek ◄</h6>
      <p>
        <img
          v-b-popover.hover.top="'brzdonc#6167'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Anita Skrodzka
      </p>
      <p>
        <img
          v-b-popover.hover.top="'Miły#6937'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Janek Cymerman
      </p>
      <p>
        <img
          v-b-popover.hover.top="'natqo#2137'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Natan Gardocki
      </p>
      <h6>► Kwestie techniczne dot. transmisji finałów na platformie Twitch ◄</h6>
      <p>
        <img
          v-b-popover.hover.top="'VinylXMarshmallow#6838'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Jakub Urbanowicz
      </p>
      <h6>► Kwestie administracji strony facebookowej ◄</h6>
      <p>
        <img
          v-b-popover.hover.top="'komunia#2381'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Marek Wiśniewski
      </p>
      <p>
        <img
          v-b-popover.hover.top="'Chmiel#1700'"
          title="Discord"
          src="~/assets/dc.png"
        > </img> Jakub Chmielewski
      </p>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  head () {
    return {
      title: this.$compConfig.name + ': Kontakt'
    }
  }
}
</script>
