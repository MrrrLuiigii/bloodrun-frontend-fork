export default {
  state: {
    gamePlayer: {
      lobbyPlayerStatus: "NotReady",
      email: "nicky@gmail.com",
      userId: 1,
      username: "MrrrLuiigii",
      session: null
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
