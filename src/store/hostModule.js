export default {
  state: {
    ipAddress: "25.77.68.216"
  },

  getters: {
    getIpAddress: state => {
      return state.ipAddress;
    }
  }
};
