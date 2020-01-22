<template>
  <div
    v-if="
      joinedLobby.userOne !== null && 
        joinedLobby.userOne.id !== 0 &&
        playerIndex === 0
    "
    class="joinedUserContainer artPanel"
  >
    <div class="joinedUsername">{{ joinedLobby.userOne.username }}</div>
    <div class="joinedStatus">
      <small v-if="joinedLobby.userOneReady">Ready!</small>
      <small v-else>Unready...</small>
    </div>
    <readyButton
      v-if="thisPlayer(joinedLobby.userOne)"
      v-bind:playerReady="joinedLobby.userOneReady"
    />
  </div>
  <div
    v-else-if="
      joinedLobby.userTwo !== null &&
        joinedLobby.userTwo.id !== 0 &&
        playerIndex === 1
    "
    class="joinedUserContainer artPanel"
  >
    <div class="joinedUsername">{{ joinedLobby.userTwo.username }}</div>
    <div class="joinedStatus">
      <small v-if="joinedLobby.userTwoReady">Ready!</small>
      <small v-else>Unready...</small>
    </div>
    <readyButton
      v-if="thisPlayer(joinedLobby.userTwo)"
      v-bind:playerReady="joinedLobby.userTwoReady"
    />
  </div>
  <div
    v-else-if="
      joinedLobby.userThree !== null &&
        joinedLobby.userThree.id !== 0 &&
        playerIndex === 2
    "
    class="joinedUserContainer artPanel"
  >
    <div class="joinedUsername">{{ joinedLobby.userThree.username }}</div>
    <div class="joinedStatus">
      <small v-if="joinedLobby.userThreeReady">Ready!</small>
      <small v-else>Unready...</small>
    </div>
    <readyButton
      v-if="thisPlayer(joinedLobby.userThree)"
      v-bind:playerReady="joinedLobby.userThreeReady"
    />
  </div>
  <div
    v-else-if="
      joinedLobby.userFour !== null &&
        joinedLobby.userFour.id !== 0 &&
        playerIndex === 3
    "
    class="joinedUserContainer artPanel"
  >
    <div class="joinedUsername">{{ joinedLobby.userFour.username }}</div>
    <div class="joinedStatus">
      <small v-if="joinedLobby.userFourReady">Ready!</small>
      <small v-else>Unready...</small>
    </div>
    <readyButton
      v-if="thisPlayer(joinedLobby.userFour)"
      v-bind:playerReady="joinedLobby.userFourReady"
    />
  </div>
  <div v-else class="joinedUserContainer noUser artPanel">
    Empty
  </div>
</template>

<script>
import readyButton from "@/components/gamelobby/readyButton";

export default {
  name: "Playerinfo",
  components: {
    readyButton
  },
  props: ["playerIndex"],
  computed: {
    joinedLobby() {
      return this.$store.getters.getJoinedlobby;
    }
  },
  methods: {
    thisPlayer(user) {
      if (this.$store.getters.getPlayerInfo.id === user.id) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style>
.joinedUserContainer {
  position: relative;

  width: 40vw;
  height: 20vh;

  margin: 1vh 1vw;
}

.joinedUsername {
  font-size: 40px;
}

.noUser {
  padding-top: 5vh;
  font-size: 30px;
}
</style>
