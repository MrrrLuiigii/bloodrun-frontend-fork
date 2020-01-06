<template>
    <div v-bind:class="[ topPlayer ? deckCardCountTop : deckCardCountBottom ]">
        {{ this.deck.cardCount }}
    </div>
</template>

<script>
export default {
    name: "deck",
    props: {
        topPlayer: Boolean
    },
    data() {
        return {
            deckCardCountTop: "deckCardCountTop",
            deckCardCountBottom: "deckCardCountBottom",
            deck: {
                cardCount: 30
            }
        }
    }
}
</script>

<style>
    .deckCardCountTop {
        position: absolute;
        top: 15.5vh;
        left: 22.8vw;

        color: white;
    }

    .deckCardCountBottom {
        position: absolute;
        bottom: 15.5vh;
        right: 22.8vw;

        color: white;
    }
</style>