<template>
  <div>
    <div>{{ this.datalobby.id }}</div>
    <div>{{ this.datalobby.name }}</div>
    <div>{{ this.datalobby.description }}</div>
    <button v-on:click="joinLobby">join</button>
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
  }
};
</script>

<style></style>
