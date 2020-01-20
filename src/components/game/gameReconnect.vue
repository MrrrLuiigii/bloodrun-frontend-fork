<template>
  <div class="disconnectedContainer">
    <h1>Disconnected</h1>
    <p>
      You have been disconnected from the game.<br />Click the button below te
      reconnect...
    </p>
    <button class="artButton">Reconnect</button>
    <homebutton />
  </div>
</template>

<script>
import homebutton from "@/components/buttons/homebutton";
export default {
  components: {
    homebutton
  }
};
</script>

<style>
.disconnectedContainer {
  padding-top: 20vh;
}
</style>
