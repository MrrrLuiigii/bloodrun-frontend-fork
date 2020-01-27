<template>
  <div>
    <v-list subheader dense>
      <v-subheader>Friends</v-subheader>
      <v-list-item
        v-for="(friend, index) in onlineFriends"
        :key="index"
        @click="startChat(friend)"
      >
        <Friendcard :friend="friend"></Friendcard>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import Friendcard from "./Friendcard";

export default {
  name: "Friendlist",
  components: {
    Friendcard
  },
  data() {
    return {
      socket: null,
      wsMessage: {
        Subject: null,
        Action: null,
        Content: null,
        Token: null
      }
    };
  },
  created() {
    this.socket = new WebSocket(
      "ws://" + this.$store.getters.getFriendsIpAddress + ":8321/ws/"
    );

    this.socket.onopen = () => {
      setTimeout(() => {
        this.registerToServer().then(() => {
          this.getFriendData();
        });
      }, 2000);
    };

    this.socket.onmessage = event => {
      this.messageReceived(event.data);
    };

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};
  },
  methods: {
    async getFriendData() {
      const token = await this.$auth.getTokenSilently();
      const cont = this.$store.getters.getPlayerInfo;
      this.wsMessage.Action = "GETALLFRIENDS";
      this.wsMessage.Content = cont;
      this.wsMessage.Token = token;
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    async registerToServer() {
      this.wsMessage.Action = "REGISTER";
      this.wsMessage.Content = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.socket.send(JSON.stringify(this.wsMessage));
    },
    async messageReceived(data) {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      switch (jsonData.Action) {
        case "GETALLFRIENDS":
          this.$store.dispatch("SaveFriendData", jsonData.Content);
          console.table(this.$store.getters.onlinefriends);
      }
    },
    startChat(friend) {
      this.$store.dispatch("addChat", friend);
    }
  },
  computed: {
    onlineFriends() {
      return this.$store.getters.onlinefriends;
    }
  }
};
</script>

<style>
.v-subheader {
  color: #c10000 !important;
}
</style>
