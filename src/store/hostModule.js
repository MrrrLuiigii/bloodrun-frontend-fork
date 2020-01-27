export default {
  state: {
    ipAddress: "145.93.96.169",
    friendsIpAddress: "25.30.108.50"
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
