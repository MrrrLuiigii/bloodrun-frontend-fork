export default {
  state: {
    lobbies: null,
    joinedLobby: null
  },
  mutations: {
    SAVE_JOINED_LOBBY(state, lobby) {
      state.joinedLobby = lobby;
    },
    SAVE_LOBBIES(state, lobbies) {
      state.lobbies = lobbies;
    }
  },
  getters: {
    getLobbies: state => {
      return state.lobbies;
    },
    getJoinedlobby: state => {
      return state.joinedLobby;
    }
  },
  actions: {
    SaveLobbies({ commit }, lobbies) {
      commit("SAVE_LOBBIES", lobbies);
    },
    SaveJoinedLobby({ commit }, lobby) {
      commit("SAVE_JOINED_LOBBY", lobby);
    }
  }
};
