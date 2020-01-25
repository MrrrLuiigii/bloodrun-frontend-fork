export default {
  state: {
    ipAddress: "25.30.148.147",
    friendsIpAddress: "localhost"
  },
  getters: {
    getIpAddress: state => {
      return state.ipAddress;
    },
    getFriendsIpAddress: state => {
      return state.friendsIpAddress;
    }
  }
};
