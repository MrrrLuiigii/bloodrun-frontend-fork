export default {
  state: {
    friends: [
    ]
  },
  mutations: {
    SEND_FRIEND_REQUEST(state, friendname) {
      state.friends.push({
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRHVBpa8tcNHQhs_Rpqf5zpgsqilYxePNVvlxjb8qJzw6-_LWMvw&s",
        username: friendname,
        active: true,
        online: true
      });
    },
    SAVE_FRIEND_DATA(state, friendData) {
      state.friends = friendData;
    }
  },
  getters: {
    onlinefriends: state => {
      return state.friends.acceptedFriends
    },
    pendingRequests: state => {
      return state.friends.pendingFriends
    },
    blockedUsers: state => {
      return state.friends.blockedFriends
    },
    getfriends: state => {
      return state.friends;
    }
  },
  actions: {
    sendFriendRequest({ commit }, friendname) {
      commit("SEND_FRIEND_REQUEST", friendname);
    },
    SaveFriendData({ commit }, friendData) {
      commit("SAVE_FRIEND_DATA", friendData);
    }
  }
};
