<template>
  <v-app>
    <div id="app">
      <router-view />
      <Friendframe></Friendframe>
      <chatlist></chatlist>
    </div>
  </v-app>
</template>

<script>
import Friendframe from "./components/friendsystem/Friendframe";
import chatlist from "./components/chat/chatlist";
export default {
  components: {
    Friendframe,
    chatlist
  },
  name: "app"
};
</script>

<style lang="scss">
@font-face {
  font-family: "Turtles";
  src: url("/assets/font/Turtles.ttf");
}

#app {
  font-family: "Turtles";
  color: #c10000;
  background-color: #191938;
  text-align: center;
  font-size: 20px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  user-select: none;
  outline: 0;
}

#logo {
  height: 75%;
  width: 75%;
  margin-bottom: 5vh;
  margin-top: 5vh;
}

.artButton:focus {
  outline: 0;
}

.artXButton:focus {
  outline: 0;
}

.artXButton {
  width: 350px;
  height: 50px;
  text-align: center;

  outline: 0;
  text-decoration: none;
  color: #c10000;

  border: 2px solid #c10000;
  border-radius: 10px;
  background-color: #32324e;

  margin: 0.5vh;
}

.artButton {
  width: 150px;
  height: 50px;
  text-align: center;

  outline: 0;
  text-decoration: none;
  color: #c10000;

  border: 2px solid #c10000;
  border-radius: 10px;
  background-color: #32324e;

  margin: 0.5vh;
}

::-webkit-scrollbar {
  display: none;
}
</style>
