<template>
    <div>
        <v-list-item>
          <v-list-item-title>Add Friend</v-list-item-title>
        <input class="form-control" type="text" v-model="wsMessage.friendname" placeholder="Username" v-on:keyup.enter="sendFriendRequest()">
      </v-list-item>

    </div>
</template>

<script>

export default {
name: "Friendadd",
 data(){
    return{
        wsMessage: {
            Subject: null,
            Action: null,
            Content: null,
            Token: null,
            friendname: null
        }
    };
},
computed: {
    getPlayerInfo(){
        return this.$store.getters.getPlayerInfo;
    },
},
components:{
    },
methods:{
    async sendFriendRequest(){
        this.wsMessage.Subject = "FRIEND"
        this.wsMessage.Action = "INVITE"
        const cont = this.getPlayerInfo
        this.wsMessage.Content = cont
        this.wsMessage.Token = await this.$auth.getTokenSilently()
        this.$socket.send(JSON.stringify(this.wsMessage))
        console.log(this.wsMessage)
            this.wsMessage.friendname = "";
        }
    }
}
</script>

<style>

</style>