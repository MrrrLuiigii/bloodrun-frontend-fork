<template>
  <div>
    <div class="disconnectedContainer">
      <h1>Reconnect</h1>
      <p>
        Click the button below te reconnect to the game...
      </p>
      <button class="artButton" @click="relauchGame">Reconnect</button>
    </div>
    <homebutton />
  </div>
</template>

<script>
import homebutton from "@/components/buttons/homebutton";
export default {
  components: {
    homebutton
  },
  data() {
    return {
      wsMessage: {
        Action: null,
        Content: null,
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
  methods: {
    async registerToServer() {
      this.wsMessage.Action = "REGISTER";
      this.wsMessage.Content = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    messageReceived(data) {
      const jsonData = JSON.parse(data);

      console.log(jsonData);
      switch (jsonData.action) {
        case "ENDGAME": {
          this.$store.dispatch("SetGameWinner", jsonData.content.winner);
          this.$store.dispatch("SetGameLobby", jsonData.content.lobby);
          this.$store.dispatch("SaveLobbies", null);
          this.$store.dispatch("SaveLobbyReady", null);
          this.$store.dispatch("SaveJoinedLobby", null);
          this.$store.dispatch("SetGameServerIp", null);
          this.$router.push({ name: "postgame"});
          break;
        }
      }
    },
    relauchGame() {
      this.setParameters();
      this.launchGame();
    },
    setParameters() {
      const username = this.$store.getters.getPlayerInfo.username;
      const ip = this.$store.getters.getGameServerIp;

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
    }
  }
};
</script>

<style>
.disconnectedContainer {
  padding-top: 20vh;
}
</style>
