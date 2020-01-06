<template>
  <div>
    <img id="logo" src="../../assets/logo.png" />

    <br />
    <br />

    <h1>Welcome, {{ this.$auth.user.name }}</h1>
    <p>
      Since this is your first login, you have to set a username to proceed.
    </p>

    <div>
      <input v-model="username" placeholder="Set username..." />

      <br />
      <br />

      <button id="register" class="btn" v-on:click="registerUsername">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import store from "../../store/index.js";
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      username: null
    };
  },
  computed: {
    getPlayerInfo() {
      return this.$store.getters.getPlayerInfo;
    }
  },
  methods: {
    async registerUsername() {
      axios
        .request({
          url: "/api/private/user/createUser/",
          method: "post",
          baseURL: "http://145.93.97.10:8081",
          headers: {
            Authorization: "Bearer " + (await this.$auth.getTokenSilently()),
            "Content-Type": "application/json"
          },
          params: {
            name: this.$auth.user.name,
            email: this.$auth.user.email
          }
        })
        .then(data => {
          store.dispatch("SavePlayerInfo", data.data);
          console.log(data.data);
        })
        .finally(() => {
          this.checkData();
        })
        .error(e => {
          console.log(e);
        });
    },
    checkData() {
      if (this.getPlayerInfo.username !== null) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  font-weight: bold;
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
