<template>
  <div class="postGameContainer">
    <div class="gameWinnerContainer">
      The winner is...<br />{{ this.getGameWinner.username }}
    </div>
    <div class="gameLobbyContainer">
      <div class="gameLobby">
        <div class="gameLobbyName">
          {{ this.getGameLobby.name }}
        </div>
        <div class="gameLobbyDescription">
          {{ this.getGameLobby.description }}
          <br /><br />
          You have lost...
        </div>
      </div>
      <div class="gameLobbyPlayersContainer">
        <div v-if="getGameLobby.userOne !== null">
          <div
            class="gameLoserContainer"
            v-if="
                getGameLobby.userOne.username !== getGameWinner.username
            "
          >
            {{ this.getGameLobby.userTwo.username }}
          </div>
        </div>

        <div v-if="getGameLobby.userTwo !== null">
          <div
            class="gameLoserContainer"
            v-if="
                getGameLobby.userTwo.username !== getGameWinner.username
            "
          >
            {{ this.getGameLobby.userTwo.username }}
          </div>
        </div>

        <div v-if="getGameLobby.userThree !== null">
          <div
            class="gameLoserContainer"
            v-if="
                getGameLobby.userThree.username !== getGameWinner.username
            "
          >
            {{ this.getGameLobby.userThree.username }}
          </div>
        </div>

        <div v-if="getGameLobby.userFour !== null">
          <div
            class="gameLoserContainer"
            v-if="
                getGameLobby.userFour.username !== getGameWinner.username
            "
          >
            {{ this.getGameLobby.userFour.username }}
          </div>
        </div>
      </div>
    </div>
    <homeButton />
  </div>
</template>

<script>
import homeButton from "@/components/buttons/homebutton";

export default {
  components: {
    homeButton
  },
  computed: {
    getGameWinner() {
      return this.$store.getters.getGameWinner;
    },
    getGameLobby() {
      return this.$store.getters.getGameLobby;
    }
  }
};
</script>

<style>
.postGameContainer {
  width: 90vw;
  height: 80vh;

  margin-left: 5vw;
  margin-top: 5vh;
}

.gameLobbyContainer {
  padding: 2vh 0;

  background-color: #32324e;

  border: 2px solid #c10000;
  border-radius: 10px;
}

.gameWinnerContainer {
  width: 80vw;
  height: 25vh;

  margin-left: 5vw;

  font-size: 80px;
}

.gameLobby {
  width: 70vw;
  height: 20vh;

  margin-left: 10vw;
}

.gameLobbyName {
  font-size: 50px;
}

.gameLobbyPlayersContainer {
  width: 70vw;
  height: 20vw;

  margin-left: 10vw;

  justify-content: center;
  display: flex;
}

.gameLoserContainer {
  width: 20vw;
  height: 20vh;

  font-size: 40px;

  background-color: #191938;

  border: 2px solid #c10000;
  border-radius: 10px;
  margin: 0 1vw;
}
</style>
