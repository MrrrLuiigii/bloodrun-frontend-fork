<template>
      <Chat
        iconColorProp="#e6e6e6"
        messageOutColorProp="#4d9e93"
        messageInColorProp="#f1f0f0"
        messageBackgroundColorProp="#ffffff"
        :messageListProp="messageList"
        :initOpenProp="initOpen"
        @onToggleOpen="handleToggleOpen"
        @onMessageWasSent="handleMessageReceived"
      />
</template>
<script>
 import {Chat} from 'vue-chat-widget'
export default {
  name: "chatbox",
  components:{
    Chat
  },
  data: () => {
    return {
      friend: Object,
      messageList: [],
      initOpen: false,
      toggledOpen: false
    }
  },
methods: {
    // Send message from you
    handleMessageReceived(message) {
      this.messageList.push(message)
    },
    // Receive message from them (handled by you with your backend)
    handleMessageResponse(message) {
       if (message.length > 0) {
            this.messageList.push({ body: message, author: 'them' })
        }
    },
    // Chat toggled open event emitted
    handleToggleOpen(open) {
      this.toggledOpen = open
      // connect/disconnect websocket or something
    },
    // Audible chat response noise, use whatever noise you want
    handleMessageResponseSound() {
      return 

    },
  },
  // init chat with a message
  mounted() {
    this.messageList.push({ body: 'Welcome to the chat, I\'m David!', author: 'them' })
  },
  watch: {
    messageList: function(newList) {
      const nextMessage = newList[newList.length - 1]
      const isIncoming = (nextMessage || {}).author !== 'you'
      if (isIncoming && this.toggledOpen) {
        return

      }
    }
  }
}
</script>

<style>

</style>