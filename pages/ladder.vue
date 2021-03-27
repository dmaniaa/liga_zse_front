<template>
  <b-container class="text-white">
    <b-row>
      <b-col
        md="12"
        lg="3"
        xl="3"
      />
      <b-col
        md="12"
        lg="6"
        xl="6"
      >
        <!-- <b-img
          src="ladder.png"
          rounded
          alt="Zdjęcie drabinki. Więcej mi się nie chce"
        /> -->
        <client-only placeholder="Ładowanie...">
          <bracket :rounds="rounds2.data">
            <template slot="player" slot-scope="{ player }">
              {{ player.name }}
            </template>
          </bracket>
        </client-only>
      </b-col>
      <b-col
        md="12"
        lg="3"
        xl="3"
      />
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const rounds2 = await $axios.$get('/getLadder.php')
    return { rounds2 }
  },
  data () {
    return {
      rounds: [
        // Semi finals
        {
          games: [
            {

              player1: { id: '1', name: 'Competitor 1', winner: false },
              player2: { id: '4', name: 'Competitor 4', winner: true }
            },
            {

              player1: { id: '5', name: 'Competitor 5', winner: false },
              player2: { id: '8', name: 'Competitor 8', winner: true }
            }
          ]
        },
        // Final
        {
          games: [
            {

              player1: { id: '4', name: 'Competitor 4', winner: false },
              player2: { id: '8', name: 'Competitor 8', winner: true }
            }
          ]
        }
      ]
    }
  },
  head () {
    return {
      title: this.$compConfig.name + ': Drabinka'
    }
  }
}
</script>
