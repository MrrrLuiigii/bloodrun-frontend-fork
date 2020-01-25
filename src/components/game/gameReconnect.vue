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
  methods: {
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
