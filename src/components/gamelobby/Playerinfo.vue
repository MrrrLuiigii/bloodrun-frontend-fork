<template>
  <div>
      <div v-if="playerIndex === 0"> 
         <div>Userid: {{joinedLobby.playerOne.userId}}</div>
         <div>Username: {{joinedLobby.playerOne.username}}</div>
         <div>Status: {{joinedLobby.playerOne.lobbyPlayerStatus}}</div>
     </div>
     <div v-else-if="joinedLobby.playerTwo !== null"> 
         <div>Userid: {{joinedLobby.playerTwo.userId}}</div>
         <div>Username: {{joinedLobby.playerTwo.username}}</div>
         <div>Status: {{joinedLobby.playerTwo.lobbyPlayerStatus}}</div>        
     </div>
       <div v-else> 
         <div>Userid: Empty</div>
         <div>Username: Empty</div>
         <div>Status: Empty</div>        
     </div>
  </div>
</template>

<script>
export default {
 name: "Playerinfo",
 props:{
     playerIndex: Number,
 },
   computed:{
    joinedLobby(){
     return this.$store.getters.getJoinedlobby;
    }
  },
}
</script>

<style>

</style>