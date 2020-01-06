<template>
<div>
          <chatbox v-for="(friend, index) in this.$store.getters.getChatList" :key="index" class="ma-3 pa-6"> </chatbox>
          </div>
</template>

<script>
import chatbox from "./chatbox"

export default {
  name: "chatlist",
  components:{ 
    chatbox,
  },
  mounted(){

  },
  data() {
    return {
        wsMessage: {
            Subject: null,
            Action: null,
            Content: null,
            Token: null
        },
        Chatcontainer: null
    };
  },
  computed: {
    getChatlist(){
      return this.$store.getters.getChatList;
    }
  },
  created(){
    this.$options.sockets.onmessage = (data) => this.messageReceived(data)
    
  },
  methods: {
    messageReceived(data){
            return data
    }
  }
};
</script>

<style>
</style>