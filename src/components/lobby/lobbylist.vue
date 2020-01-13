<template>
  <div class="lobbyContainer scrollable">
    <div
      class="artPanel"
      v-bind:class="[ index % 2 === 0 ? lobbyLeft : lobbyRight ]"
      v-for="(lobby, index) in getlobbies"
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
      lobbyLeft: "lobbyLeft",
      lobbyRight: "lobbyRight",
      wsMessage: {
        Subject: null,
        Action: null,
        Content: null,
        Token: null
      },
      Chatcontainer: null
    };
  },
  computed: {
    getlobbies() {
      return this.$store.getters.getLobbies;
    }
  },
  created() {
    this.$options.sockets.onmessage = data => this.messageReceived(data);
    this.loadNewLobbies();
  },
  methods: {
    async loadNewLobbies() {
      this.wsMessage.Subject = "LOBBY";
      this.wsMessage.Action = "GETLOBBIES";
      const cont = this.$store.getters.getPlayerInfo;
      this.wsMessage.Content = cont;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
      this.getDecks();
    },
    async getDecks() {
      this.wsMessage.Subject = "DECK";
      this.wsMessage.Action = "GETALLDECK";
      const cont = this.$store.getters.getPlayerInfo;
      this.wsMessage.Content = cont;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
    },
    messageReceived(data) {
      const jsonData = JSON.parse(data.data);
      switch (jsonData.action) {
        case "JOINLOBBY": {
          const data = jsonData.content;
          const id = data.id;
          this.$store.dispatch("SaveJoinedLobby", data);
          this.$router.push({ name: "gamelobby", params: { id } });
          break;
        }
        case "GETLOBBIES":
          this.$store.dispatch("SaveLobbies", jsonData.content.lobbies);
          break;
        case "GETALLDECK":
          console.log(jsonData.content);
          this.$store.dispatch("SaveDeckCollection", jsonData.content);
          break;
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
