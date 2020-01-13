<template>
  <div>
    <Router-link to="/">
      <button class="artButton homeButton">
        Home
      </button>
    </Router-link>
  </div>
</template>
<script>
export default {
  name: "homebutton"
};
</script>
<style>
.homeButton {
  position: absolute;
  left: 10px;
  bottom: 10px;
  text-decoration: none;
  outline: 0;
}

.homeButton:focus {
  outline: 0;
}
</style>
