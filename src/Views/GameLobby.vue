<template>
  <div>
    <p>{{ this.joinedLobby }}</p>
    <Playerinfo v-bind:playerIndex="0" />
    <Playerinfo v-bind:playerIndex="1" />
    <Playerinfo v-bind:playerIndex="2" />
    <Playerinfo v-bind:playerIndex="3" />
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
    this.socket = new WebSocket("ws://145.93.149.160:8250/ws/");

    this.socket.onopen = () => {
      this.registerToServer();
    };

    this.socket.onmessage = event => {
      console.log(event.data);
      this.messageReceived(event.data);
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
      console.table("Data" + data);
      const jsonData = JSON.parse(data);
      switch (jsonData.action) {
        case "STARTGAME": {
          this.setParameters(jsonData);
          this.launchGame();
          console.log("Yeet");
          break;
        }
      }
    },
    setParameters(jsonData) {
      console.log("SetParameters");

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
      console.log("LaunchGame");

      var child = require("child_process").execFile;
      var executablePath = "C:\\Bloodrun\\BloodRunV2.exe";

      child(executablePath, function(err, data) {
        if (err) {
          console.error(err);
          return;
        }

        console.log(data.toString());
      });
    },
    async startGame() {
      this.wsMessage.Action = "STARTGAME";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
    },
    async leave() {
      this.wsMessage.Action = "LEAVELOBBY";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Player = this.$store.getters.getPlayerInfo;
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
