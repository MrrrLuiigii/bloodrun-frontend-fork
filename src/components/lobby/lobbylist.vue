<template>
  <div class="lobbyContainer scrollable">
    <div
      v-bind:class="[index % 2 === 0 ? lobbyLeft : lobbyRight]"
      v-for="(lobby, index) in a"
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
        Action: null,
        Content: null,
        Token: null
      },
      Chatcontainer: null
    };
  },
  computed: {
    a() {
      return this.$store.getters.getLobbies;
    }
  },
  created() {
    this.$options.sockets.onmessage = data => this.messageReceived(data);
    this.loadLobbies();
  },
  methods: {
    async loadLobbies() {
      this.wsMessage.Action = "GETLOBBIES";
      const cont = this.$store.getters.getPlayerInfo;
      this.wsMessage.Content = cont;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
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
        case "GETLOBBIES": {
          this.$store.dispatch("SaveLobbies", jsonData.content.lobbies);
          console.table(jsonData.content.lobbies);
          console.log(this.$store.getters.getLobbies);
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
