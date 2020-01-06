<template>
    <div>
        <GameLobbyDeck v-bind:deckIndex="indexData"/>
    </div>
</template>

<script>
import GameLobbyDeck from "@/components/gamelobby/GameLobbyDeck"
export default {
    name:"GameLobbyDeckSlots",
    components:{
        GameLobbyDeck
    },
     props:['Index'],
     data(){
         return{
             indexData: this.Index
         }
     }

}
</script>

<style>

</style>