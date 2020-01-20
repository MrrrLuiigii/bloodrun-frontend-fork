<template>
  <div>
    <p>{{ joinedLobby }}</p>
    <Playerinfo v-bind:playerIndex="0" />
    <Playerinfo v-bind:playerIndex="1" />
    <Playerinfo v-bind:playerIndex="2" />
    <Playerinfo v-bind:playerIndex="3" />
    <div>
      <div>
        <Router-link to="/lobbies">
          <button v-on:click="leave" class="artXButton">
            Leave
          </button>
        </Router-link>
      </div>
      <div v-if="GamePlayer.lobbyPlayerStatus === 'NotReady'">
        <button v-on:click="ready" class="artXButton">
          Ready
        </button>
      </div>
      <div v-else>
        <button v-on:click="unReady" class="artXButton">
          Unready
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Playerinfo from "@/components/gamelobby/Playerinfo";

export default {
  components: {
    Playerinfo
  },
  data: function() {
    return {
      id: "",
      wsMessage: {
        Action: null,
        Content: null,
        Player: null,
        Token: null
      }
    };
  },
  created() {
    this.$options.sockets.onmessage = data => this.messageReceived(data);
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  computed: {
    joinedLobby() {
      return this.$store.getters.getJoinedlobby;
    },
    GamePlayer() {
      return this.$store.getters.getGamePlayer;
    },
    getplayer() {
      return this.$store.getters.getPlayerInfo;
    }
  },
  methods: {
    messageReceived(data) {
      const jsonData = JSON.parse(data.data);
      switch (jsonData.action) {
        case "JOINLOBBY": {
          this.$store.dispatch("SaveJoinedLobby", jsonData.content);
          console.table(jsonData.content);
          break;
        }
      }
    },
    async leave() {
      this.wsMessage.Action = "LEAVELOBBY";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Player = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
    },
    async ready() {
      this.wsMessage.Action = "PLAYERREADY";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Player = this.$store.getters.getGamePlayer;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
    },
    async unReady() {
      this.wsMessage.Action = "PLAYERNOTREADY";
      this.wsMessage.Content = this.joinedLobby;
      this.wsMessage.Player = this.$store.getters.getGamePlayer;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
    }
  }
};
</script>
