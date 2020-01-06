<template>
  <div>
    <homebutton />
    <board />
  </div>
</template>

<script>
import board from "@/components/game/board.vue";
import homebutton from "@/components/buttons/homebutton";
export default {
  name: "Deckbuilder",
  components: {
    homebutton,
    board
  }
};
</script>

<style></style>
