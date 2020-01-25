export default {
  state: {
    ipAddress: "25.30.148.147"
  },
  getters: {
    getIpAddress: state => {
      return state.ipAddress;
    }
  }
};
