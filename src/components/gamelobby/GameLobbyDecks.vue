<template>
  <div>
      <div v-if="getSelectedDeck !== null">
          Chosen deck is: {{getSelectedDeck.name}}
    </div>
      <div v-else>
          Choose a deck to play with!
     </div>

      <GameLobbyDeckSlots v-bind:Index="0"/>
      <GameLobbyDeckSlots v-bind:Index="1"/>
      <GameLobbyDeckSlots v-bind:Index="2"/>
      <GameLobbyDeckSlots v-bind:Index="3"/>
      <GameLobbyDeckSlots v-bind:Index="4"/>
      <GameLobbyDeckSlots v-bind:Index="5"/>
  </div>
</template>

<script>
import GameLobbyDeckSlots from "@/components/gamelobby/GameLobbyDeckSlots";
export default {
name:"GameLobbyDecks",
components:{
    GameLobbyDeckSlots,
    },
computed: {
    getSelectedDeck(){
      return this.$store.getters.getSelectedDeck;
    }
  },
}
</script>

<style>

</style>