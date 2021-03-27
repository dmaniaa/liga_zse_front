<template>
  <b-container class="text-white">
    <ul>
      <li>
        <h4 v-b-toggle="'p1'">
          Czy w drużynie może być 6 osób?
        </h4>
      </li>
      <b-collapse id="p1">
        Tak, może
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p2'">
          Czy rezerwowy musi się zarejestrować na stronie?
        </h4>
      </li>
      <b-collapse id="p2">
        Tak, po to jest 6 miejsc
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p3'">
          Nie dodali mi roli/kanału na Discordzie. Co robić, jak żyć?
        </h4>
      </li>
      <b-collapse id="p3">
        Poczekać, admin to też człowiek, a bot jest w fazie bardzo bardzo wczesnej alfy, czasem się psuje.
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p4'">
          Nie mogę się zarejestrować, ratunku!
        </h4>
      </li>
      <b-collapse id="p4">
        Na stronie powinien wyświetlić się komunikat z błędem, jeśli jednak coś poszło bardzo nie tak, skontaktuj się z adminem, dane są na stronie "Kontakt"
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p5'">
          Nie pamiętam hasła.
        </h4>
      </li>
      <b-collapse id="p5">
        W menu logowania masz opcję resetu hasła
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p6'">
          W mojej drużynie uległy zmiany, co robić?
        </h4>
      </li>
      <b-collapse id="p6">
        Do 18.10.2020 możemy wprowadzić zmiany, skontaktuj się z administratorem
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p7'">
          Od kiedy i do kiedy mogę zarejestrować zespół?
        </h4>
      </li>
      <b-collapse id="p7">
        Od 03.10 do 18.10.2020
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p8'">
          Pomyliłem się przy rejestracji i wpisałem złe dane, co zrobić?
        </h4>
      </li>
      <b-collapse id="p8">
        Zaloguj się, i sprawdź czy sam możesz zmienić te dane. Jeśli nie, skontaktuj się z administratorem
      </b-collapse>
      <li>
        <h4 v-b-toggle="'p9'">
          Czy mogę zmienić nazwę drużyny?
        </h4>
      </li>
      <b-collapse id="p9">
        Tak, jeśli rozgrywki jeszcze nie wystartowały. Skontakuj się w tej sprawie z administracją.
      </b-collapse>
    </ul>
  </b-container>
</template>
<script>
export default {
  head () {
    return {
      title: this.$compConfig.name + ': FAQ'
    }
  }
}
</script>
