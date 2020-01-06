<template>
  <div class="board">
      <deck v-bind:topPlayer="true"/>
      <hand v-bind:topPlayer="true"/>
      <player v-bind:topPlayer="true"/>
      <playrow v-bind:topPlayer="true"/>
      <playrow v-bind:topPlayer="false"/>
      <player v-bind:topPlayer="false"/>
      <hand v-bind:topPlayer="false"/>
      <deck v-bind:topPlayer="false"/>
      <endButton />
  </div>
</template>

<script>
    import hand from "@/components/game/hand.vue"
    import playrow from "@/components/game/playrow.vue"
    import player from "@/components/game/player.vue"
    import endButton from "@/components/game/endButton.vue"
    import deck from "@/components/game/deck.vue"
    export default {
        name: "board",
        components: {
            playrow,
            hand,
            player,
            endButton,
            deck
        },
        data() {
            return {

            }
        }

    }
</script>

<style>
    .board {
        background-image: url("../../assets/game/boardNew.png");
        background-size: 100% 100%;

        height: 100vh;
        width: 100vw;
    }
</style>