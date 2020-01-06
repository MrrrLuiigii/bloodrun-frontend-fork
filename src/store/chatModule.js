export default {
    state: {
        chatList:[]
    },
    mutations: {
        ADD_CHAT(state, friend) {
           const index = state.chatList.indexOf(friend);
           console.log(index);
               if(index < 0 ){
                state.chatList.push(friend);               
               }
    },
},
    getters: {
        getChatList: state => {
            return state.chatList;
        }
    },
    actions: {
        addChat({ commit }, friend) {
            commit("ADD_CHAT", friend);
          }
    }
}