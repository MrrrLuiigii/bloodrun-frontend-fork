<template>
  <div v-if="pendingRequests !== []">

        <v-list subheader dense>
      <v-subheader>Pending Friend Requests</v-subheader>
        <v-list-item v-for="(requests, index) in pendingRequests" :key="index" >
            <v-list-item-avatar size="36">
            <v-img :src="requests.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title v-text="requests.username"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon @click="acceptUser(requests)">
            <v-icon color="teal darken-2">mdi-account-check</v-icon>
            </v-list-item-icon>
            <v-list-item-icon @click="denyUser(requests)">
            <v-icon color="red accent-4">mdi-account-off</v-icon>
            </v-list-item-icon>
            <v-list-item-icon @click="blockUser(requests)">
            <v-icon color="red darken-4">mdi-block-helper</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list>
  </div>    
</template>

<script>
export default {
    name:"Friendrequest",
    computed: {
    pendingRequests() {
        return this.$store.getters.pendingRequests;
        },
          getPlayerInfo(){
        return this.$store.getters.getPlayerInfo;
    }
    },
    data() {
    return {
      wsMessage: {
        Subject: null,
        Action: null,
        Content: {user: null, friend: null},
        Token: null,
    }
  };
  },
    methods:{
     async acceptUser(requests){
        console.log(requests)
            this.wsMessage.Subject = "FRIEND"
          this.wsMessage.Action = "ACCEPTREQUEST"
         const cont = this.getPlayerInfo
        this.wsMessage.Content.user = cont
        this.wsMessage.Content.friend = requests
        this.wsMessage.Token = await this.$auth.getTokenSilently()
        this.$socket.send(JSON.stringify(this.wsMessage))
        console.log(this.wsMessage)
      },
      async denyUser(requests){
             this.wsMessage.Subject = "FRIEND"
          this.wsMessage.Action = "REMOVEFRIEND"
         const cont = this.getPlayerInfo
        this.wsMessage.Content.user = cont
        this.wsMessage.Content.friend = requests
        this.wsMessage.Token = await this.$auth.getTokenSilently()
        this.$socket.send(JSON.stringify(this.wsMessage))
        console.log(this.wsMessage)
      },
     async blockUser(requests){
             this.wsMessage.Subject = "FRIEND"
          this.wsMessage.Action = "BLOCKREQUEST"
         const cont = this.getPlayerInfo
        this.wsMessage.Content.user = cont
        this.wsMessage.Content.friend = requests
        this.wsMessage.Token = await this.$auth.getTokenSilently()
        this.$socket.send(JSON.stringify(this.wsMessage))
        console.log(this.wsMessage)
      },
    }
}
</script>

<style>

</style>