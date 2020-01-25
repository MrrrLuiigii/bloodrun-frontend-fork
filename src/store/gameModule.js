export default {
  state: {
    gameServerIpAddress: null,
    gameWinner: null,
    gameLobby: null
  },
  mutations: {
    SET_GAMESERVER_IP(state, ipAddress) {
      state.gameServerIpAddress = ipAddress;
    },
    SET_GAME_WINNER(state, winner) {
      state.gameWinner = winner;
    },
    SET_GAME_LOBBY(state, lobby) {
      state.gameLobby = lobby;
    }
  },
  getters: {
    getGameServerIp: state => {
      return state.gameServerIpAddress;
    },
    getGameWinner: state => {
      return state.gameWinner;
    },
    getGameLobby: state => {
      return state.gameLobby;
    }
  },
  actions: {
    SetGameServerIp({ commit }, ipAddress) {
      commit("SET_GAMESERVER_IP", ipAddress);
    },
    SetGameWinner({ commit }, winner) {
      commit("SET_GAME_WINNER", winner);
    },
    SetGameLobby({ commit }, lobby) {
      commit("SET_GAME_LOBBY", lobby);
    }
  }
};
