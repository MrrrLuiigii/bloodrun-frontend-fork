<template>
  <div></div>
</template>

<script>
export default {
  name: postGame,
  components: {},
  data() {
    return {
      winner: null,
      lobby: null
    };
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
    messageReceived(data) {
      const jsonData = JSON.parse(data);
      switch (jsonData.action) {
        case "ENDGAME": {
          this.winner = jsonData.winner;
          this.lobby = jsonData.lobby;
          this.$store.dispatch("SaveLobbies", null);
          this.$store.dispatch("SaveLobbyReady", null);
          this.$store.dispatch("SaveJoinedLobby", null);
          this.$store.dispatch("SetGameServerIp", null);
          this.$router.push({ name: "home", params: { id } });
          break;
        }
      }
    }
  }
};
</script>

<style></style>
