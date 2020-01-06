<template>
<div>
  <div>
    <Router-link to="/lobbies">
        <button
      class="artXButton"
    >
      Play
    </button>
    </router-link>
  </div>
<div>
      <Router-link to="/deckbuilder">
        <button
      class="artXButton"
    >
      DeckBuilder
    </button>
        </router-link>
  </div>
  <div>
        <Router-link to="/shop">
        <button
      class="artXButton"
    >
      Shop
    </button>
        </router-link>
  </div>
  <div>
        <Router-link to="/quests">
        <button
      class="artXButton"
    >
      Quests
    </button>
        </router-link>
  </div>

<div>
        <Router-link to="/game">
        <button
      class="artXButton"
    >
      Game
    </button>
        </router-link>
  </div>

  <div>
          <button
        class="artButton"
        @click="logout()"
      >
        Quit
      </button >
    </div>
  </div>
</template>

<script>
export default {
name: "navbar",
methods: {
    logout(){
      if(confirm("Are you sure that you want to logout?")){
        this.$auth.logout();
    }
  }
}
}


</script>

<style>

</style>