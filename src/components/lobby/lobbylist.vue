<template>
  <div class="lobbyContainer scrollable">
    <div
      v-bind:class="[index % 2 === 0 ? lobbyLeft : lobbyRight]"
      v-for="(lobby, index) in getLobbies"
      :key="index"
      :lobby="lobby"
    >
      <lobby :lobby="lobby"></lobby>
    </div>
  </div>
</template>

<script>
import lobby from "./lobby";

export default {
  name: "lobbylist",
  components: {
    lobby
  },
  data() {
    return {
      socket: null,
      lobbyLeft: "lobbyLeft",
      lobbyRight: "lobbyRight",
      wsMessage: {
        Action: null,
        Content: null,
        Token: null
      },
      Chatcontainer: null
    };
  },
  computed: {
    getLobbies() {
      return this.$store.getters.getLobbies;
    }
  },
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
      this.messageReceived(event.data);
    };

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};
  },
  methods: {
    async registerToServer() {
      this.wsMessage.Action = "REGISTER";
      this.wsMessage.Content = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    async loadLobbies() {
      this.wsMessage.Action = "GETLOBBIES";
      this.wsMessage.Content = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    messageReceived(data) {
      const jsonData = JSON.parse(data);
      switch (jsonData.action) {
        case "JOINLOBBY": {
          const data = jsonData.content;
          const id = data.id;
          this.$store.dispatch("SaveJoinedLobby", data);
          this.$router.push({ name: "gamelobby", params: { id } });
          break;
        }
        case "GETLOBBIES": {
          this.$store.dispatch("SaveLobbies", jsonData.content.lobbies);
          break;
        }
      }
    }
  }
};
</script>

<style>
.lobbyLeft {
  float: left;
}

.lobbyRight {
  float: right;
}

.lobbyContainer {
  width: 800px;
  margin: 2vh auto 10vh auto;
  height: 85vh;
}

.scrollable {
  overflow: scroll;
}
</style>
