<template>
  <div>
    <div v-if="connected" class="disconnectedContainer">
      <h1>Disconnected</h1>
      <p>
        You have been disconnected from the game.<br />Click the button below te
        reconnect...
      </p>
      <button class="artButton">Reconnect</button>
    </div>
    <div v-else class="connectedContainer">
      <h1>Connected</h1>
      <p>
        Your game is currently running...
      </p>
    </div>
    <homebutton />
  </div>
</template>

<script>
import homebutton from "@/components/buttons/homebutton";
export default {
  components: {
    homebutton
  },
  props: ["connected"]
};
</script>

<style>
.connectedContainer {
  padding-top: 20vh;
}

.disconnectedContainer {
  padding-top: 20vh;
}
</style>
