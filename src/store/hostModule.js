export default {
  state: {
    ipAddress: "localhost",
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
