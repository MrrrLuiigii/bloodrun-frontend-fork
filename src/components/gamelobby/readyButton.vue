<template>
  <button
    v-if="!playerReady"
    class="lobbyPlayerReadyButton artButton"
    @click="ready"
  >
    Ready
  </button>
  <button v-else class="lobbyPlayerReadyButton artButton" @click="unReady">
    Unready
  </button>
</template>

<script>
export default {
  data() {
    return {
      wsMessage: {
        Action: null,
        Content: null,
        Token: null
      }
    };
  },
  props: ["playerReady"],
  computed: {
    getJoinedlobby() {
      return this.$store.getters.getJoinedlobby;
    }
  },
  created() {
    this.socket = new WebSocket(
      "ws://" + this.$store.getters.getIpAddress + ":8250/ws/"
    );

    this.socket.onopen = () => {};

    this.socket.onmessage = event => {
      this.messageReceived(event.data);
    };

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};
  },
  methods: {
    async ready() {
      this.wsMessage.Action = "SETREADY";
      var lobby = JSON.parse(JSON.stringify(this.getJoinedlobby));
      this.wsMessage.Content = lobby;
      this.wsMessage.Content.userOne = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
      this.allPlayersReady;
    },
    async unReady() {
      this.wsMessage.Action = "SETUNREADY";
      var lobby = JSON.parse(JSON.stringify(this.getJoinedlobby));
      this.wsMessage.Content = lobby;
      this.wsMessage.Content.userOne = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
      this.allPlayersReady;
    },
    allPlayersReady() {
      var count = 0;
      if (this.getJoinedlobby.userOneReady) {
        count++;
      }

      if (this.getJoinedlobby.userTwoReady) {
        count++;
      }

      if (this.getJoinedlobby.userThreeReady) {
        count++;
      }

      if (this.getJoinedlobby.userFourReady) {
        count++;
      }

      if (this.getPlayerCount === count) {
        this.$store.dispatch("SaveLobbyReady", true);
      }

      this.$store.dispatch("SaveLobbyReady", false);
    },
    getPlayerCount() {
      var count = 0;

      if (this.getJoinedlobby.userOne.id !== 0) {
        count++;
      }

      if (this.getJoinedlobby.userTwo.id !== 0) {
        count++;
      }

      if (this.getJoinedlobby.userThree.id !== 0) {
        count++;
      }

      if (this.getJoinedlobby.userFour.id !== 0) {
        count++;
      }

      return count;
    }
  }
};
</script>

<style>
.lobbyPlayerReadyButton {
  background-color: #191938;

  position: absolute;
  bottom: 1vh;
  left: 4.5vw;
}
</style>
