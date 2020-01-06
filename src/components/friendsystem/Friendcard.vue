<template>
  <v-app class="friendCard">
    <v-list-item @contextmenu="show">
      <v-list-item-avatar size="36">
        <v-img :src="friend.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="friend.username"></v-list-item-title>
        <v-list-item-subtitle
          v-text="friend.accountStatus"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon>
        <v-icon :color="friend.active ? 'purple' : 'grey'">mdi-chat</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list v-if="friend.friendStatus !== 'Blocked'">
        <v-list-item
          v-for="(item, index) in unblocked"
          :key="index"
          @click="item.menuAction(friend)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-if="friend.friendStatus == 'Blocked'">
        <v-list-item
          v-for="(item, index) in blocked"
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
      showMenu: false,
      x: 0,
      y: 0,
      unblocked: [
        {
          title: "Remove friend",
          menuAction: friend => {
            this.removeFriend(friend);
          }
        },
        {
          title: "Block all communications",
          menuAction: friend => {
            this.blockFriend(friend);
          }
        }
      ],
      blocked: [
        {
          title: "Unblock",
          menuAction: friend => {
            this.unblockFriend(friend);
          }
        }
      ],
      wsMessage: {
        Subject: null,
        Action: null,
        Content: { user: null, friend: null },
        Token: null,
        friendname: null
      }
    };
  },
  methods: {
    async removeFriend(friend) {
      if (
        confirm(
          "Are you sure that you want to remove " + friend.username + " ?"
        )
      ) {
        this.wsMessage.Subject = "FRIEND";
        this.wsMessage.Action = "REMOVEFRIEND";
        const cont = this.getPlayerInfo;
        this.wsMessage.Content.user = cont;
        this.wsMessage.Content.friend = friend;
        this.wsMessage.Token = await this.$auth.getTokenSilently();
        this.$socket.send(JSON.stringify(this.wsMessage));
        console.log(this.wsMessage);
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
        this.wsMessage.Subject = "FRIEND";
        this.wsMessage.Action = "BLOCKREQUEST";
        const cont = this.getPlayerInfo;
        this.wsMessage.Content.user = cont;
        this.wsMessage.Content.friend = friend;
        this.wsMessage.Token = await this.$auth.getTokenSilently();
        this.$socket.send(JSON.stringify(this.wsMessage));
        console.log(this.wsMessage);
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
        this.wsMessage.Subject = "FRIEND";
        this.wsMessage.Action = "ACCEPTREQUEST";
        const cont = this.getPlayerInfo;
        this.wsMessage.Content.user = cont;
        this.wsMessage.Content.friend = friend;
        this.wsMessage.Token = await this.$auth.getTokenSilently();
        this.$socket.send(JSON.stringify(this.wsMessage));
        console.log(this.wsMessage);
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
