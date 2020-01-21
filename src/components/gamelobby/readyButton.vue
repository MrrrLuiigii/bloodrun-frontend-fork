<template>
  <button
    v-if="!playerReady"
    class="lobbyPlayerReadyButton artButton"
    @click="ready"
  >
    Ready
  </button>
  <button v-else class="lobbyPlayerReadyButton artButton" @click="unReady">
    Unready
  </button>
</template>

<script>
export default {
  props: ["playerReady"],
  methods: {
    async ready() {
      //call ready stuff to websocket
    },
    async unReady() {
      //call unready stuff to websocket
    }
  }
};
</script>

<style>
.lobbyPlayerReadyButton {
  background-color: #191938;

  position: absolute;
  bottom: 1vh;
  left: 4.5vw;
}
</style>
