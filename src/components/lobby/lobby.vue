<template>
  <div class="lobbyBlock">
    <div>
      <div class="lobbyName">{{ this.datalobby.name }}</div>
      <div class="lobbyDescription">{{ this.datalobby.description }}</div>
      <div class="lobbyDescription">{{ this.getPlayerCount() }} / 4</div>
      <div>
        <button
          v-if="this.playerCount < 4"
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
      playerCount: 0,
      socket: null,
      datalobby: this.lobby,
      wsMessage: {
        Subject: null,
        Action: null,
        Content: null,
        Token: null
      }
    };
  },
  created() {
    this.playerCount = this.getPlayerCount();

    this.socket = new WebSocket(
      "ws://" + this.$store.getters.getIpAddress + ":8250/ws/"
    );

    this.socket.onopen = () => {};

    this.socket.onmessage = () => { this.playerCount = this.getPlayerCount() };

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};
  },
  methods: {
    async joinLobby() {
      this.wsMessage.Subject = "LOBBY";
      this.wsMessage.Action = "JOINLOBBY";
      this.wsMessage.Content = this.datalobby;
      this.wsMessage.Content.userOne = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    getPlayerCount() {
      var count = 0;

      if (this.datalobby.userOne.id !== 0) {
        count++;
      }

      if (this.datalobby.userTwo.id !== 0) {
        count++;
      }

      if (this.datalobby.userThree.id !== 0) {
        count++;
      }

      if (this.datalobby.userFour.id !== 0) {
        count++;
      }

      return count;
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
  position: absolute;
  bottom: 2vh;

  margin-left: -4vw;

  border-radius: 10px;
  border: 2px solid #c10000;
  background-color: #191938;
}

.lobbyBlock {
  height: 25vh;
  width: 20vw;
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
