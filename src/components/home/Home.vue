<template>
  <div>
    <img id="logo" src="../../assets/logo.png" />

    <navbar></navbar>
  </div>
</template>

<script>
import navbar from "../nav/nav";
import axios from "axios";
import store from "../../store/index.js";

export default {
  name: "Home",
  components: {
    navbar
  },
  mounted() {},
  data() {
    return {
      wsMessage: {
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
    this.GetUserInformation();
  },
  methods: {
    async GetUserInformation() {
      axios
        .request({
          url: "/api/private/user/getByEmail/" + this.$auth.user.email,
          method: "get",
          baseURL: "http://145.93.96.211:8081",
          headers: {
            Authorization: "Bearer " + (await this.$auth.getTokenSilently()),
            "Content-Type": "application/json"
          }
        })
        .then(data => {
          store.dispatch("SavePlayerInfo", data.data);
        })
        .finally(() => {
          this.checkData();
        })
        .error(e => {
          console.log(e);
        });
    },
    checkData() {
      if (this.getPlayerInfo.name === null) {
        this.$router.push("/register");
      }
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
