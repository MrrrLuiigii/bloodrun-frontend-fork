export default {
  state: {
    gameServerIpAddress: null
  },
  mutations: {
    SET_GAMESERVER_IP(state, ipAddress) {
      state.gameServerIpAddress = ipAddress;
    }
  },
  getters: {
    getGameServerIp: state => {
      return state.gameServerIpAddress;
    }
  },
  actions: {
    SetGameServerIp({ commit }, ipAddress) {
      commit("SET_GAMESERVER_IP", ipAddress);
    }
  }
};
