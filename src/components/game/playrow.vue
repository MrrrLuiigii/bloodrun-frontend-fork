<template>
  <div class="playRow">
    <div v-bind:class="[ topPlayer ? playRowContainerTop : playRowContainerBottom ]">
        <cardslot/>
        <cardslot/>
        <cardslot/>
        <cardslot/>
        <cardslot/>
        <cardslot/>
    </div>
  </div>
</template>

<script>
import cardslot from "@/components/game/cardslot.vue"
export default {
    name: "playRow",
    components: {
        cardslot
    },
    props: {
        topPlayer: Boolean
    },
    data() {
        return {
            playRowContainerTop: "playRowContainerTop",
            playRowContainerBottom: "playRowContainerBottom"
        }
    }
}
</script>

<style>
    .playRowContainerTop {
        justify-content: center;
        display: flex;

        margin: auto;
        padding-left: .2vw;

        width: 100%;
    }

    .playRowContainerBottom {
        justify-content: center;
        display: flex;

        margin: auto;
        padding-left: .2vw;
        padding-top: 7.2vh;

        width: 100%;
    }

    .playRow {
        width: 100%;
    }
</style>