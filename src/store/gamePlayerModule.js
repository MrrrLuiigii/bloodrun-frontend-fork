export default {
  state: {
    gamePlayer: {
      email: null,
      userId: null,
      username: null
    }
  },
  mutations: {
    SAVE_GAME_PLAYER(state, player) {
      state.gamePlayer = player;
    }
  },
  getters: {
    getGamePlayer: state => {
      return state.gamePlayer;
    }
  },
  actions: {
    SaveGamePlayer({ commit }, player) {
      commit("SAVE_GAME_PLAYER", player);
    }
  }
};
