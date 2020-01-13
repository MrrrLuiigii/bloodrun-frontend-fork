<template>
  <div class="lobbyBlock">
    <div>
      <div class="lobbyName">{{ this.datalobby.name }}</div>
      <div class="lobbyDescription">{{ this.datalobby.description }}</div>
      <div class="lobbyDescription">{{this.getPlayerCount()}} / 2</div>
    </div>    
    <button v-if="this.getPlayerCount() < 2" class="artSButton joinButton" v-on:click="joinLobby">Join</button>
    <div v-else class="artSButton joinButton">Full</div>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  props: ['lobby'],
data() {
  return {
    datalobby: this.lobby,
      wsMessage: {
        Subject: null,
        Action: null,
        Content: null,
        Player: null,
        Token: null
      },
    }
},
 methods: {
   async joinLobby(){
    this.wsMessage.Subject = "LOBBY"
    this.wsMessage.Action = "JOINLOBBY"
    this.wsMessage.Content = this.datalobby
    this.wsMessage.Player = this.$store.getters.getPlayerInfo
    this.wsMessage.Token = await this.$auth.getTokenSilently()
    this.$socket.send(JSON.stringify(this.wsMessage))
    console.log(this.wsMessage)
   },
   getPlayerCount(){
     if(this.datalobby.playerTwo !== null){
       return 2
     }
     return 1
   },
  }
};
</script>

<style>
  .lobbyName {
    font-size: 30px;
  }

  .lobbyDescription {
    font-size: 15px;
  }

  .joinButton {
    position: absolute;
    bottom: 2vh;
  }

  .lobbyBlock {
    height: 100%;
    widows: 100%;
    position: relative;
    padding: 2vh 5vw;
    justify-content: center;
    display: flex;
  }
</style>
