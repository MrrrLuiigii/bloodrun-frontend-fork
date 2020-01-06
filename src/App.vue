<template>
<v-app>
    <div id="app">
      <router-view/>
      <Friendframe></Friendframe>
      <chatlist></chatlist>
    </div>
  </v-app>
</template>


<script>
import Friendframe from "./components/friendsystem/Friendframe"
import chatlist from "./components/chat/chatlist"
  export default {
    components:{
      Friendframe,
      chatlist
    },
  name: "app",
  
  }
</script>

<style lang="scss">
  @font-face { 
    font-family: "RetroComputer";
    src: url("/assets/font/RetroComputer.ttf"); 
  }

  #app {
    font-family: "RetroComputer";
    color: #35252f;
    background-color: #3a5248;
    text-align: center;
    font-size: 20px;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    user-select: none;
  }

  #logo {
    height: 75%;
    width: 75%;
    margin-bottom: 5vh;
    margin-top: 5vh;
  }

  .artXButton {
    width: 350px;
    height: 50px;
    text-align: center;
    background-image: url("./assets/buttonLong.png");
    background-size: 100% 100%;
    margin: 0.5vh;
  }

  .artButton {
    width: 150px;
    height: 50px;
    text-align: center;
    background-image: url("./assets/button.png");
    background-size: 100% 100%;
    margin: 0.5vh;
  }

  ::-webkit-scrollbar {
    display:none;
  }
</style>