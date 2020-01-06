<template>
  <div>
    <p>{{joinedLobby}}</p>
    <Playerinfo v-bind:playerIndex="0"/>
    <Playerinfo v-bind:playerIndex="1"/>
    <GameLobbyDecks/>
    <p>{{GamePlayer}}</p>

    <div>
      <div>  
         <Router-link to="/lobbies">
            <button v-on:click="leave"
            class="artXButton"
          >
            Leave
          </button>
       </Router-link>
     </div>
     <div v-if="GamePlayer.lobbyPlayerStatus === 'NotReady'">  
        <button v-on:click="ready"
        class="artXButton"
      >
        Ready
      </button>
    </div>
      <div v-else>  
        <button v-on:click="unReady"
        class="artXButton"
      >
        Unready
      </button>
     </div>
  </div>
  </div>
</template>

<script>
import Playerinfo from "@/components/gamelobby/Playerinfo";
import GameLobbyDecks from "@/components/gamelobby/GameLobbyDecks"

export default {
  components:{
    Playerinfo,
    GameLobbyDecks
  },
  data: function() {
    return {
      id: "",
      wsMessage: {
        Subject: null,
        Action: null,
        Content: null,
        Player: null,
        Token: null
      },
    };
  },
    created(){
    this.$options.sockets.onmessage = (data) => this.messageReceived(data)   
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  computed:{
    joinedLobby(){
     return this.$store.getters.getJoinedlobby;
    },
    GamePlayer(){
     return this.$store.getters.getGamePlayer;
    },
      getSelectedDeck(){
      return this.$store.getters.getSelectedDeck;
    },
        getplayer(){
      return this.$store.getters.getPlayerInfo;
    },
  },
  methods: {
       messageReceived(data){
      const jsonData = JSON.parse(data.data)
      switch(jsonData.action){
        case "UPDATELOBBY":{
          this.$store.dispatch('SaveJoinedLobby', jsonData.content) 
          this.updateGamePlayer(jsonData.content) 
          break
        }
      }
    },
    updateGamePlayer(data){
      const user = this.getplayer
      if(data.playerOne !== undefined){
        if(data.playerOne.username === user.username){
        this.$store.dispatch('SaveGamePlayer', data.playerOne)  
        }else{
        this.$store.dispatch('SaveGamePlayer', data.playerTwo)  
        }
      }
      else{
        this.$store.dispatch('SaveGamePlayer', data.playerTwo)  
      }
    },
    async leave(){
    this.wsMessage.Subject = "LOBBY"
    this.wsMessage.Action = "LEAVELOBBY"
    this.wsMessage.Content = this.joinedLobby
    this.wsMessage.Player = this.$store.getters.getPlayerInfo
    this.wsMessage.Token = await this.$auth.getTokenSilently()
    this.$socket.send(JSON.stringify(this.wsMessage))
    this.$store.dispatch('ClearSelectedDeck', null)
    },
    ready(){
      if(this.getSelectedDeck === null){
        this.$toasted.show("No deck selected please select a deck", {
                            theme: "toasted-primary",
                            position: "bottom-right",
                            duration: 2500
                        });
      }else{
        this.sendReady()
      }
    },
   async sendReady(){
        this.wsMessage.Subject = "LOBBY"
    this.wsMessage.Action = "PLAYERREADY"
    this.wsMessage.Content = this.joinedLobby
    this.wsMessage.Player = this.$store.getters.getGamePlayer
    this.wsMessage.Token = await this.$auth.getTokenSilently()
    this.$socket.send(JSON.stringify(this.wsMessage))
    },
    async unReady(){
  this.wsMessage.Subject = "LOBBY"
    this.wsMessage.Action = "PLAYERNOTREADY"
    this.wsMessage.Content = this.joinedLobby
    this.wsMessage.Player = this.$store.getters.getGamePlayer
    this.wsMessage.Token = await this.$auth.getTokenSilently()
    this.$socket.send(JSON.stringify(this.wsMessage))
    }
  }
};
</script>