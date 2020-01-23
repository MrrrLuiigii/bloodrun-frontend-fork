<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRHVBpa8tcNHQhs_Rpqf5zpgsqilYxePNVvlxjb8qJzw6-_LWMvw&s"
      ></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="friendsCardName">
        {{ this.$store.getters.getPlayerInfo.username }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "Userstatus"
};
</script>

<style>
.friendsCardName {
  font-size: 25px !important;
  text-align: left !important;
}
</style>
