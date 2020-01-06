<template>
<div v-if="getplayer.deckCollection.decks[deckIndex] !== undefined">
    <div v-on:click="selectDeck">{{getplayer.deckCollection.decks[deckIndex].name}}</div>  
</div>
<div v-else>
    <div>Empty deck of cards</div>
</div>
</template>

<script>
export default {
name:"GameLobbyDeck",
     props:{
     deckIndex: Number,
 },
 data(){
     return{
               wsMessage: {
        Subject: null,
        Action: null,
        Content: null,
        Player: null,
        Token: null
      },
      Player: this.$store.getters.getGamePlayer,
      User: this.$store.getters.getPlayerInfo
     }
 },
computed: {
    getplayer(){
      return this.$store.getters.getPlayerInfo;
    },
    joinedLobby(){
     return this.$store.getters.getJoinedlobby;
    }
  },
  methods:{
    async selectDeck(){

        this.$store.dispatch('SetDeck', this.getplayer.deckCollection.decks[this.deckIndex])
        this.wsMessage.Subject = "LOBBY"
        this.wsMessage.Action = "SETDECK"
        this.wsMessage.Content = this.joinedLobby



        this.Player.username = this.User.username
        this.Player.userId = this.User.userId
        this.Player.deck =  this.getplayer.deckCollection.decks[this.deckIndex]

        this.wsMessage.Player = this.Player
        this.wsMessage.Token = await this.$auth.getTokenSilently()
        this.$socket.send(JSON.stringify(this.wsMessage))
        this.$store.dispatch('SaveGamePlayer', this.Player)
    }
  }
}
</script>

<style>

</style>