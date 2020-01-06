<template>
  <div>
    <img id="logo" src="../../assets/logo.png" />

    <navbar></navbar>
  </div>
</template>

<script>
import navbar from "../nav/nav";

export default {
  name: "Home",
  components: {
    navbar
  },
  mounted() {},
  data() {
    return {
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
    getPlayerInfo() {
      return this.$store.getters.getPlayerInfo;
    }
  },
  created() {
    this.$options.sockets.onmessage = data => this.messageReceived(data);
    this.GetUserInformation();
  },
  methods: {
    async GetUserInformation() {
      this.wsMessage.Subject = "USER";
      this.wsMessage.Action = "GetUserByEmail";
      this.wsMessage.Content = this.$auth.user.email;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
    },
    checkData() {
      if (this.getPlayerInfo.username == null) {
        this.$router.push("/register");
      } else {
        this.registerToServer();
      }
    },
    messageReceived(data) {
      console.log(data.data);
      const jsonData = JSON.parse(data.data);
      switch (jsonData.action) {
        case "GetUserByEmail":
          this.$store.dispatch("SavePlayerInfo", jsonData.content);
          console.log(jsonData.content);
          this.checkData();
          break;
      }
    },
    async registerToServer() {
      this.wsMessage.Subject = "REGISTER";
      this.wsMessage.Action = "";
      const cont = this.getPlayerInfo;
      this.wsMessage.Content = cont;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
    }
  }
};
</script>

<style scoped>
body {
  color: #35252f;
  background-color: #3a5248;
  text-align: center;

  font-size: 2vh;
}

h1 {
  font-size: 5vh;
  font-weight: bold;
}

img {
  height: 100%;
  width: 100%;
  margin-bottom: 5vh;
}

input {
  width: 350px;
  height: 40px;
  text-align: center;
}

button {
  width: 150px;
  height: 50px;
  text-align: center;
}
</style>
