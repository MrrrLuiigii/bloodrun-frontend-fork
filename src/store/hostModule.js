export default {
  state: {
    ipAddress: "192.168.0.4"
  },

  getters: {
    getIpAddress: state => {
      return state.ipAddress;
    }
  }
};
