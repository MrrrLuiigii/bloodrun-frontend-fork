export default {
    state: {
        friends: []
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
        state.friends = friendData
      },
    },
    getters: {
        onlinefriends: state => {
            return state.friends.filter(friend => {
              return friend.accountStatus == "Online" && friend.friendStatus == "Accepted";
            });
        },
        offlinefriends: state => {
            return state.friends.filter(friend => {
              return friend.accountStatus == "Offline" && friend.friendStatus == "Accepted";
            });
        },
        inLobbyFriends: state => {
          return state.friends.filter(friend => {
            return friend.accountStatus == "InLobby" && friend.friendStatus == "Accepted";
          });
      },
      inGameFriends: state => {
        return state.friends.filter(friend => {
          return friend.accountStatus == "InGame" && friend.friendStatus == "Accepted";
        });
    },
        pendingRequests: state => {
          return state.friends.filter(friend => {
            return friend.friendStatus == "Requested";
          });
        },
        blockedUsers: state => {
          return state.friends.filter(friend => {
            return friend.friendStatus == "Blocked";
          });
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
}