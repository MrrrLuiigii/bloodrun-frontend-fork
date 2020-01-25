export default {
  state: {
    ipAddress: "192.168.1.72"
  },
  getters: {
    getIpAddress: state => {
      return state.ipAddress;
    }
  }
};
