<template>
  <div>
    <v-list-item>
      <v-list-item-title>Add Friend</v-list-item-title>
      <input
        class="form-control"
        type="text"
        v-model="wsMessage.friendname"
        placeholder="Username"
        v-on:keyup.enter="sendFriendRequest()"
      />
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "Friendadd",
  data() {
    return {
      socket: null,
      wsMessage: {
        Action: null,
        Content: null,
        Token: null,
        friendname: null
      }
    };
  },
  computed: {
    getPlayerInfo() {
      return this.$store.getters.getPlayerInfo;
    }
  },
  created() {
    this.socket = new WebSocket();
    // "ws://" + this.$store.getters.getIpAddress + ":8250/ws/"

    this.socket.onopen = () => {};

    this.socket.onmessage = () => {};

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};

    this.getFriendData();
  },
  methods: {
    async sendFriendRequest() {
      this.wsMessage.Action = "INVITE";
      const cont = this.getPlayerInfo;
      this.wsMessage.Content = cont;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
      this.wsMessage.friendname = "";
    }
  }
};
</script>

<style>
.v-list-item__title {
  color: #c10000;
}

.form-control {
  color: #c10000 !important;
}

.form-control:focus {
  color: #c10000 !important;
}
</style>
