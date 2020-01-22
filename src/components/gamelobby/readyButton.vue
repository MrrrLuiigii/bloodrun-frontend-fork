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
  props: ["playerReady"],
  created() {
    this.socket = new WebSocket(
      "ws://" + this.$store.getters.getIpAddress + ":8250/ws/"
    );

    this.socket.onopen = () => {
      this.registerToServer().then(() => {
        this.loadLobbies();
      });
    };

    this.socket.onmessage = event => {
      console.log(event.data);
      this.messageReceived(event.data);
    };

    this.socket.onclose = function() {
      // if (event.wasClean) {
      // } else {
      // }
    };

    this.socket.onerror = function() {};
  },
  methods: {
    async ready() {
      //call ready stuff to websocket
      this.wsMessage.Action = "READY";
      this.wsMessage.Content = this.$store.getter.getJoinedLobby;
      this.wsMessage.Content.userOne = this.$store.getter.playerInfo
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    async unReady() {
      this.wsMessage.Action = "UNREADY";
      this.wsMessage.Content = this.$store.getter.getJoinedLobby;
      this.wsMessage.Content.userOne = this.$store.getter.playerInfo
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
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
