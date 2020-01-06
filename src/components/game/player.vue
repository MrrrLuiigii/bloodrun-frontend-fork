<template>
    <div v-bind:class="[ topPlayer ? heroContainerTop : heroContainerBottom ]">
        <div v-bind:class="[ topPlayer ? playerTop : playerBottom ]">
            <div v-bind:class="[ topPlayer ? heroHpTop : heroHpBottom ]">
                {{ this.Hero.hp }}
            </div>
            <div v-bind:class="[ topPlayer ? heroBlueManaTop : heroBlueManaBottom ]">
                {{ this.Hero.blueMana }}
            </div>
            <div v-bind:class="[ topPlayer ? heroDeathEssenceTop : heroDeathEssenceBottom ]">
                {{ this.Hero.deathEssence }}
            </div>
            <div v-bind:class="[ topPlayer ? heroNameTop : heroNameBottom ]">
                {{ this.Hero.name }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "player",
    props: {
        topPlayer: Boolean
    },
    data() {
        return {
            heroBlueManaTop: "heroBlueManaTop",
            heroBlueManaBottom: "heroBlueManaBottom",
            heroDeathEssenceTop: "heroDeathEssenceTop",
            heroDeathEssenceBottom: "heroDeathEssenceBottom",
            heroHpTop: "heroHpTop",
            heroHpBottom: "heroHpBottom",
            heroNameTop: "heroNameTop",
            heroNameBottom: "heroNameBottom",
            playerTop: "playerTop",
            playerBottom: "playerBottom",
            heroContainerTop: "heroContainerTop",
            heroContainerBottom: "heroContainerBottom",
            Hero: {
                name: "suchACoolBoy",
                hp: 30,
                blueMana: 10,
                deathEssence: 10
            }
        }
    }

}
</script>

<style>
    .heroContainerTop {
        position: relative;

        justify-content: center;
        display: flex;

        padding-top: 3vh;

        width: 100%;
        height: 12vh;
    }

    .heroContainerBottom {
        position: relative;

        justify-content: center;
        display: flex;

        width: 100%;
        height: 12vh;
    }

    .playerTop {
        justify-content: center;
        display: flex;

        position: relative;

        width: 25%;
    }

    .playerBottom {
        justify-content: center;
        display: flex;

        position: relative;

        width: 25%;
        height: 10vh;
    }

    .heroNameTop {
        color: white;

        position: absolute;
        bottom: 4.5vh;
        left: 3vw;

        margin-left: -10vw;

    }

    .heroNameBottom {
        color: white;

        position: absolute;
        bottom: 3vh;
        right: 3vw;

        margin-right: -10vw;
    }

    .heroHpTop {
        color: white;

        position: absolute;
        bottom: .5vh;

        width: 25px;
        height: 25px;
    }

    .heroHpBottom {
        color: white;

        position: absolute;
        bottom: 7.6vh;

        width: 25px;
        height: 25px;
    }

    .heroBlueManaTop {
        color: white;

        position: absolute;
        left: 3.7vw;
        bottom: 3.4vh;

        width: 25px;
        height: 25px;
    }

    .heroBlueManaBottom {
        color: white;

        position: absolute;
        right: 3.7vw;
        bottom: 4.6vh;

        width: 25px;
        height: 25px;
    }

    .heroDeathEssenceTop {
        color: white;

        position: absolute;
        right: 4.1vw;
        bottom: 3.6vh;

        width: 25px;
        height: 25px;
    }

    .heroDeathEssenceBottom {
        color: white;

        position: absolute;
        left: 4vw;
        bottom: 4.4vh;

        width: 25px;
        height: 25px;
    }
</style>