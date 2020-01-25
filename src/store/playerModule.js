export default {
  state: {
    player: null
  },
  mutations: {
    SAFE_PLAYER_INFO(state, player) {
      state.player = player;
    }
  },
  getters: {
    getPlayerInfo: state => {
      return state.player;
    }
  },
  actions: {
    SavePlayerInfo({ commit }, player) {
      commit("SAFE_PLAYER_INFO", player);
    }
  }
};
