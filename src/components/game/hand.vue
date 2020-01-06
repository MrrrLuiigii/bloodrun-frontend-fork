<template>
    <div class="hand">
        <div v-bind:class="[ topPlayer ? handContainerTop : handContainerBottom ]">
            <cardslot/>
            <cardslot/>
            <cardslot/>
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
    name: "hand",
    props: {
        topPlayer: Boolean
    },
    components: {
        cardslot
    },
    data() {
        return {
            handContainerTop: "handContainerTop",
            handContainerBottom: "handContainerBottom"
        }
    }
}
</script>

<style>
    .handContainerTop {
        justify-content: center;
        display: flex;

        margin: auto;
        padding-left: 6.1vw;
        padding-top: 10.5vh;

        width: 100%;
    }

    .handContainerBottom {
        justify-content: center;
        display: flex;

        margin: auto;
        padding-right: 5.8vw;

        width: 100%;
    }

    .hand {
        width: 100%;
    }

</style>