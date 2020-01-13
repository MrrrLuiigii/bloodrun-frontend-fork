<template>
  <div class="lobbyBlock">
    <div>
      <div class="lobbyName">{{ this.datalobby.name }}</div>
      <div class="lobbyDescription">{{ this.datalobby.description }}</div>
      <div class="lobbyDescription">{{ this.getPlayerCount() }} / 4</div>
      <div>
        <button
          v-if="this.getPlayerCount() < 4"
          class="joinButton artButton"
          v-on:click="joinLobby"
        >
          Join
        </button>
        <div v-else class="joinButton artButton">Full</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  props: ["lobby"],
  data() {
    return {
      datalobby: this.lobby,
      wsMessage: {
        Subject: null,
        Action: null,
        Content: null,
        Player: null,
        Token: null
      }
    };
  },
  methods: {
    async joinLobby() {
      this.wsMessage.Subject = "LOBBY";
      this.wsMessage.Action = "JOINLOBBY";
      this.wsMessage.Content = this.datalobby;
      this.wsMessage.Player = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
      this.$router.push({ name: "gamelobby" });
    },
    getPlayerCount() {
      return this.datalobby.players.length;
    }
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
  border-radius: 10px;
  border: 2px solid #c10000;
  background-color: #191938;
}

.lobbyBlock {
  height: 100%;
  widows: 100%;
  position: relative;
  padding: 2vh 5vw;
  justify-content: center;
  display: flex;
  background-color: #32324e;
  border-radius: 10px;
  border: 2px solid #c10000;
  margin-bottom: 2vh;
}
</style>
