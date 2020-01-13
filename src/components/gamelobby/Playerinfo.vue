<template>
  <div>
    <div v-if="joinedLobby.userOne !== null">
      <div>Userid: {{ joinedLobby.userOne.userId }}</div>
      <div>Username: {{ joinedLobby.userOne.username }}</div>
      <div>Status: {{ joinedLobby.userOne.lobbyPlayerStatus }}</div>
    </div>
    <div v-else-if="joinedLobby.userTwo !== null">
      <div>Userid: {{ joinedLobby.userTwo.userId }}</div>
      <div>Username: {{ joinedLobby.userTwo.username }}</div>
      <div>Status: {{ joinedLobby.userTwo.lobbyPlayerStatus }}</div>
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
  props: {
    playerIndex: Number
  },
  computed: {
    joinedLobby() {
      return this.$store.getters.getJoinedlobby;
    }
  }
};
</script>

<style></style>
