export default {
  state: {
    player: null
  },
  mutations: {
    SAFE_PLAYER_INFO(state, player) {
      state.player = player;
    },
    SAVE_DECK_COLLECTION(state, deckcollection) {
      state.player.deckCollection = deckcollection;
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
    },
    SaveDeckCollection({ commit }, deckcollection) {
      commit("SAVE_DECK_COLLECTION", deckcollection);
    }
  }
};
