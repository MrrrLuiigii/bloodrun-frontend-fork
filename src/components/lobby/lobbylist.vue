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
    this.socket = new WebSocket("ws://145.93.149.160:8250/ws/");

    this.socket.onopen = () => {
      this.registerToServer().then(() => {
        this.loadLobbies();
      });
    };

    this.socket.onmessage = event => {
      console.log(event.data);
      this.aap(event.data);
    };

    this.socket.onclose = function(event) {
      console.log("Connection closed: " + event);
      // if (event.wasClean) {
      // } else {
      // }
    };

    this.socket.onerror = function(error) {
      console.log("Error: " + error);
    };
  },
  methods: {
    async registerToServer() {
      this.wsMessage.Action = "REGISTER";
      this.wsMessage.Content = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
    },
    async loadLobbies() {
      this.wsMessage.Action = "GETLOBBIES";
      this.wsMessage.Content = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
    },
    aap(data) {
      console.table(data);
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
          console.log(jsonData.content);
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
  width: 750px;
  margin: 2vh auto 10vh auto;
  height: 85vh;
}

.scrollable {
  overflow: scroll;
}
</style>
