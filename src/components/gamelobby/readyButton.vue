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
    },
    async unReady() {
      this.wsMessage.Action = "SETUNREADY";
      var lobby = JSON.parse(JSON.stringify(this.getJoinedlobby));
      this.wsMessage.Content = lobby;
      this.wsMessage.Content.userOne = this.$store.getters.getPlayerInfo;
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
