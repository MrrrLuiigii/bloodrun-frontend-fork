<template>
  <div>
    <p>{{ this.joinedLobby }}</p>

    <div class="joinedPlayersContainer">
      <Playerinfo v-bind:playerIndex="0" />
      <Playerinfo v-bind:playerIndex="1" />
      <Playerinfo v-bind:playerIndex="2" />
      <Playerinfo v-bind:playerIndex="3" />
    </div>

    <div>
      <div>
        <button v-on:click="startGame" class="artXButton">Start</button>
      </div>
      <div>
        <Router-link to="/lobbies">
          <button v-on:click="leave" class="artXButton">
            Leave
          </button>
        </Router-link>
      </div>
      <div v-if="GamePlayer.lobbyPlayerStatus === 'NotReady'">
        <button v-on:click="ready" class="artXButton">
          Ready
        </button>
      </div>
      <div v-else>
        <button v-on:click="unReady" class="artXButton">
          Unready
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Playerinfo from "@/components/gamelobby/Playerinfo";

export default {
  components: {
    Playerinfo
  },
  data() {
    return {
      socket: null,
      id: "",
      wsMessage: {
        Action: null,
        Content: null,
        Player: null,
        Token: null
      }
    };
  },
  created() {
    this.socket = new WebSocket(
      "ws://" + this.$store.getters.getIpAddress + ":8250/ws/"
    );

    this.socket.onopen = () => {
      this.registerToServer();
    };

    this.socket.onmessage = event => {
      this.messageReceived(event.data);
    };

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  computed: {
    joinedLobby() {
      return this.$store.getters.getJoinedlobby;
    },
    GamePlayer() {
      return this.$store.getters.getGamePlayer;
    },
    getplayer() {
      return this.$store.getters.getPlayerInfo;
    }
  },
  methods: {
    async registerToServer() {
      this.wsMessage.Action = "REGISTER";
      this.wsMessage.Content = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    messageReceived(data) {
      const jsonData = JSON.parse(data);
      switch (jsonData.action) {
        case "STARTGAME": {
          this.setParameters(jsonData);
          this.launchGame();
          break;
        }
        case "JOINLOBBY": {
          const data = jsonData.content;
          this.$store.dispatch("SaveJoinedLobby", data);
          break;
        }
        case "UPDATELOBBY": {
          const data = jsonData.content;
          this.$store.dispatch("SaveJoinedLobby", data);
          break;
        }
      }
    },
    setParameters(jsonData) {
      const username = this.$store.getters.getPlayerInfo.username;
      const ip = jsonData.content.ip;

      var content = ip + "\n" + username;

      const filepath = "C:\\Bloodrun\\BloodrunProperties.props";

      var fs = require("fs");
      try {
        fs.writeFileSync(filepath, content, "utf-8");
      } catch (e) {
        alert("Failed to save the file !");
      }
    },
    launchGame() {
      var child = require("child_process").execFile;
      var executablePath = "C:\\Bloodrun\\BloodRunV2.exe";

      child(executablePath, function(err, data) {
        if (err) {
          console.error(err + data);
          return;
        }
      });
    },
    async startGame() {
      this.wsMessage.Action = "STARTGAME";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    async leave() {
      this.wsMessage.Action = "LEAVELOBBY";

      var lobby = JSON.parse(JSON.stringify(this.joinedLobby));
      lobby.userOne = null;
      lobby.userTwo = null;
      lobby.userThree = null;
      lobby.userFour = null;
      lobby.userOne = this.$store.getters.getPlayerInfo;

      this.wsMessage.Content = lobby;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    async ready() {
      this.wsMessage.Action = "PLAYERREADY";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Player = this.$store.getters.getGamePlayer;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    async unReady() {
      this.wsMessage.Action = "PLAYERNOTREADY";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Player = this.$store.getters.getGamePlayer;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    }
  }
};
</script>

<style>
.joinedPlayersContainer {
  height: 50vh;
  width: 80vw;
  justify-content: center;
  display: flex;

  margin-left: 10vw;

  border: 5px solid orange;
}
</style>
