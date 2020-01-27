export default {
  state: {
    ipAddress: "localhost",
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
