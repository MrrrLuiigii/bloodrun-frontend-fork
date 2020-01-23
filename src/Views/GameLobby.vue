<template>
  <div>
    <div class="lobbyDetails">
      <h1 class="gameLobbyName">{{ this.joinedLobby.name }}</h1>
      <p class="lobbyDescription">{{ this.joinedLobby.description }}</p>
    </div>

    <div class="joinedPlayersContainer">
      <Playerinfo v-bind:playerIndex="0" />
      <Playerinfo v-bind:playerIndex="1" />
      <Playerinfo v-bind:playerIndex="2" />
      <Playerinfo v-bind:playerIndex="3" />
    </div>

    <div class="startAndLeaveContainer">
      <div v-if="getLobbyReady">
        <button v-on:click="startGame" class="artXButton startGameButton">
          Start
        </button>
      </div>
      <div v-else>
        <button class="artXButton disabledButton startGameButton">Start</button>
      </div>
      <div>
        <Router-link to="/lobbies">
          <button v-on:click="leave" class="artXButton">
            Leave
          </button>
        </Router-link>
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
      playerCount: 0,
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
      this.getPlayerCount();
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
    },
    getLobbyReady() {
      return this.$store.getters.getLobbyReady;
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
          this.getPlayerCount();
          this.allPlayersReady();
          break;
        }
        case "UPDATELOBBY": {
          const data = jsonData.content;
          this.$store.dispatch("SaveJoinedLobby", data);
          this.allPlayersReady();
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
    allPlayersReady() {
      var count = 0;
      if (this.joinedLobby.userOneReady) {
        count++;
      }

      if (this.joinedLobby.userTwoReady) {
        count++;
      }

      if (this.joinedLobby.userThreeReady) {
        count++;
      }

      if (this.joinedLobby.userFourReady) {
        count++;
      }

      if (this.getPlayerCount() === count) {
        return this.$store.dispatch("SaveLobbyReady", true);
      }

      return this.$store.dispatch("SaveLobbyReady", false);
    },
    getPlayerCount() {
      var count = 0;

      if (this.joinedLobby.userOne !== null) {
        if (this.joinedLobby.userOne.id !== 0) {
          count++;
        }
      }

      if (this.joinedLobby.userTwo !== null) {
        if (this.joinedLobby.userTwo.id !== 0) {
          count++;
        }
      }

      if (this.joinedLobby.userThree !== null) {
        if (this.joinedLobby.userThree.id !== 0) {
          count++;
        }
      }

      if (this.joinedLobby.userFour !== null) {
        if (this.joinedLobby.userFour.id !== 0) {
          count++;
        }
      }

      this.playerCount = count;
      return count;
    }
  }
};
</script>

<style>
.joinedPlayersContainer {
  width: 85vw;
  justify-content: center;
  display: flex;

  margin-left: 7.5vw;
  padding: 2vh 2vw;
}

.lobbyDetails {
  width: 60vw;
  height: 20vh;

  margin: 15vh 0 5vh 20vw;
  padding-top: 2vh;

  background-color: #32324e;
  border: 2px solid #c10000;
  border-radius: 10px;
}

.gameLobbyName {
  font-size: 70px;
}

.disabledButton {
  opacity: 0.5;
}

.startGameButton {
  margin-bottom: 2vh;
}

.startAndLeaveContainer {
  width: 80vw;
  margin: 5vh 0 0 10vw;
}
</style>
