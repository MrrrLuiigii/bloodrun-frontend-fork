<template>
  <div>
    <v-list subheader dense>
      <v-subheader>Online Friends</v-subheader>
      <v-list-item
        v-for="(friend, index) in onlineFriends"
        :key="index"
        @click="startChat(friend)"
      >
        <Friendcard :friend="friend"></Friendcard>
      </v-list-item>
    </v-list>
    <v-list subheader dense>
      <v-subheader>Inlobby Friends</v-subheader>
      <v-list-item
        v-for="(friend, index) in inLobbyFriends"
        :key="index"
        @click="startChat(friend)"
      >
        <Friendcard :friend="friend"></Friendcard>
      </v-list-item>
    </v-list>
    <v-list subheader dense>
      <v-subheader>InGame Friends</v-subheader>
      <v-list-item
        v-for="(friend, index) in inGameFriends"
        :key="index"
        @click="startChat(friend)"
      >
        <Friendcard :friend="friend"></Friendcard>
      </v-list-item>
    </v-list>
    <v-list subheader dense>
      <v-subheader>Offline Friends</v-subheader>
      <v-list-item
        v-for="(friend, index) in offlineFriends"
        :key="index"
        @click="startChat(friend)"
      >
        <Friendcard :friend="friend"></Friendcard>
      </v-list-item>
    </v-list>
    <v-list subheader dense>
      <v-subheader>Blocked Users</v-subheader>
      <v-list-item v-for="(friend, index) in blockedUsers" :key="index">
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
      "ws://" + this.$store.getters.getIpAddress + ":8250/ws/"
    );

    this.socket.onopen = () => {};

    this.socket.onmessage = event => {
      this.messageReceived(event.data);
    };

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};

    this.getFriendData();
  },
  methods: {
    async getFriendData() {
      const token = await this.$auth.getTokenSilently();
      setTimeout(() => {
        const cont = this.$store.getters.getPlayerInfo;
        if (cont.username !== null) {
          this.wsMessage.Action = "GETALLFRIENDS";
          cont.email = this.$auth.user.email;
          this.wsMessage.Content = cont;
          this.wsMessage.Token = token;
          this.socket.send(JSON.stringify(this.wsMessage));
        }
      }, 900);
    },
    async messageReceived(data) {
      const jsonData = JSON.parse(data.data);
      switch (jsonData.action) {
        case "GETALLFRIENDS":
          this.$store.dispatch("SaveFriendData", jsonData.content.friends);
      }
    },
    startChat(friend) {
      this.$store.dispatch("addChat", friend);
    }
  },
  computed: {
    onlineFriends() {
      return this.$store.getters.onlinefriends;
    },
    inLobbyFriends() {
      return this.$store.getters.inLobbyFriends;
    },
    inGameFriends() {
      return this.$store.getters.inGameFriends;
    },
    offlineFriends() {
      return this.$store.getters.offlinefriends;
    },
    blockedUsers() {
      return this.$store.getters.blockedUsers;
    }
  }
};
</script>

<style>
.v-subheader {
  color: #c10000 !important;
}
</style>
