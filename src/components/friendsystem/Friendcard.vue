<template>
  <v-app class="friendCard">
    <v-list-item @contextmenu="show">
      <v-list-item-avatar size="36">
        <v-img :src="this.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="friend.username"></v-list-item-title>
      </v-list-item-content>

    </v-list-item>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list >
        <v-list-item
          v-for="(item, index) in friendAction"
          :key="index"
          @click="item.menuAction(friend)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app>
</template>

<script>
export default {
  name: "Friendcard",
  props: {
    friend: {
      type: Object,
      required: true
    }
  },
  computed: {
    getPlayerInfo() {
      return this.$store.getters.getPlayerInfo;
    }
  },
  data() {
    return {
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRHVBpa8tcNHQhs_Rpqf5zpgsqilYxePNVvlxjb8qJzw6-_LWMvw&s",
      showMenu: false,
      x: 0,
      y: 0,
      friendAction: [
        {
          title: "Remove friend",
          menuAction: friend => {
            this.removeFriend(friend);
          }
        },
      ],
      wsMessage: {
        Action: null,
        Content: { user: null, friend: null },
        Token: null,
        friendname: null
      }
    };
  },
  created() {
    this.socket = new WebSocket(
      "ws://" + this.$store.getters.getFriendsIpAddress + ":8321/ws/"
    );

    this.socket.onopen = () => {};

    this.socket.onmessage = () => {};

    this.socket.onclose = function() {};

    this.socket.onerror = function() {};

  },
  methods: {
    async removeFriend(friend) {
      if (
        confirm(
          "Are you sure that you want to remove " + friend.username + " ?"
        )
      ) {
        this.wsMessage.Action = "REMOVEFRIEND";
        const cont = this.getPlayerInfo;
        this.wsMessage.Content.user = cont;
        this.wsMessage.Content.friend = friend;
        this.wsMessage.Token = await this.$auth.getTokenSilently();
        this.socket.send(JSON.stringify(this.wsMessage));
      }
    },
    async blockFriend(friend) {
      if (
        confirm(
          "Are you sure that you want block all communications with " +
            friend.username +
            " ?"
        )
      ) {
        this.wsMessage.Action = "BLOCKREQUEST";
        const cont = this.getPlayerInfo;
        this.wsMessage.Content.user = cont;
        this.wsMessage.Content.friend = friend;
        this.wsMessage.Token = await this.$auth.getTokenSilently();
        this.socket.send(JSON.stringify(this.wsMessage));
      }
    },
    async unblockFriend(friend) {
      if (
        confirm(
          "Are you sure that you want unblock all communications with " +
            friend.username +
            " ?"
        )
      ) {
        this.wsMessage.Action = "ACCEPTREQUEST";
        const cont = this.getPlayerInfo;
        this.wsMessage.Content.user = cont;
        this.wsMessage.Content.friend = friend;
        this.wsMessage.Token = await this.$auth.getTokenSilently();
        this.socket.send(JSON.stringify(this.wsMessage));
      }
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.offsetX;
      this.y = e.offsetY;

      this.$nextTick(() => {
        this.showMenu = true;
      });
    }
  }
};
</script>

<style>
.v-list-item__subtitle {
  color: #c10000 !important;
}

.friendCard {
  height: 100px !important;
  border-radius: 10px !important;
  background-color: #191938 !important;
  color: #c10000 !important;
}

.v-application--wrap {
  min-height: 0px !important;
}
</style>
