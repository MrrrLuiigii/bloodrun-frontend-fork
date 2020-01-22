export default {
  state: {
    lobbies: null,
    joinedLobby: null,
    lobbyReady: null
  },
  mutations: {
    SAVE_JOINED_LOBBY(state, lobby) {
      state.joinedLobby = lobby;
    },
    SAVE_LOBBIES(state, lobbies) {
      state.lobbies = lobbies;
    },
    SAVE_LOBBY_READY(state, lobbyReady) {
      state.lobbyReady = lobbyReady;
    }
  },
  getters: {
    getLobbies: state => {
      return state.lobbies;
    },
    getJoinedlobby: state => {
      return state.joinedLobby;
    },
    getLobbyReady: state => {
      return state.lobbyReady;
    }
  },
  actions: {
    SaveLobbies({ commit }, lobbies) {
      commit("SAVE_LOBBIES", lobbies);
    },
    SaveJoinedLobby({ commit }, lobby) {
      commit("SAVE_JOINED_LOBBY", lobby);
    },
    SaveLobbyReady({ commit }, lobbyReady) {
      commit("SAVE_JOINED_LOBBY", lobbyReady)
    }
  }
};
