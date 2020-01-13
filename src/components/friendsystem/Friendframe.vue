<template class="index">
  <div>
    <button class="artButton friendButton" @click.stop="drawer = !drawer">
      Friends
    </button>

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <Userstatus />

      <v-divider></v-divider>

      <Friendadd />

      <v-divider></v-divider>

      <Friendrequest />

      <v-divider></v-divider>

      <Friendlist />
    </v-navigation-drawer>
  </div>
</template>

<script>
import Userstatus from "./Userstatus";
import Friendadd from "./Friendadd";
import Friendlist from "./Friendlist";
import Friendrequest from "./Friendrequest";

export default {
  data() {
    return {
      drawer: null
    };
  },
  name: "Friendframe",
  components: {
    Userstatus,
    Friendadd,
    Friendlist,
    Friendrequest
  }
};
</script>

<style>
.index {
  position: absolute;
  z-index: 1000;
}

.friendButton {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.v-navigation-drawer__content {
  background-color: #32324e;
  color: #c10000;
}
</style>
