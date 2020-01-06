<template>
    <div class="cardSlot">
        <card/>
    </div>
</template>

<script>
    import card from "@/components/game/card.vue"
    export default {
        name: "cardslot",
        components: {
            card
        },
        data() {
            return {

            }
        }
    }
</script>

<style>
    .cardSlot {
        float: left;

        margin: 0 8.6px 0 8.6px;

        width: 5vw;
        height: 12vh;
    }
</style>