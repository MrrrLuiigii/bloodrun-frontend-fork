<template>
  <div>
    <div>
      <Router-link to="/lobbies">
        <button class="artXButton">
          Play
        </button>
      </Router-link>
    </div>
    <div>
      <button class="artButton" @click="logout()">
        Quit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    logout() {
      if (confirm("Are you sure that you want to logout?")) {
        this.$auth.logout();
      }
    }
  }
};
</script>

<style></style>
