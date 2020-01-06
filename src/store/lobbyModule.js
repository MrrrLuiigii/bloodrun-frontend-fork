export default {
    state: {
        lobbies: null,
        joinedLobby: null,
        selectedDeck: null,
    },
    mutations: {
    SAVE_JOINED_LOBBY(state, lobby) {
    state.joinedLobby = lobby;
    },
    SAVE_LOBBIES(state, lobbies) {
    state.lobbies = lobbies;
    //TODO implement
    },
    SET_DECK(state, deck) {
    state.selectedDeck = deck;
    },
    CLEAR_DECK(state, deck) {
    state.selectedDeck = deck;
     },
 },
    getters: {
    getLobbies: state => {
        return state.lobbies;
        },  
    getJoinedlobby: state => {
        return state.joinedLobby;
    },
    getSelectedDeck: state => {
        return state.selectedDeck;
    }
    },
    actions: {
    SaveLobbies({ commit }, lobbies) {
        commit("SAVE_LOBBIES", lobbies);
        },
    SaveJoinedLobby({ commit }, lobby) {
        commit("SAVE_JOINED_LOBBY", lobby);
        },
    SetDeck({ commit }, deck) {
        commit("SET_DECK", deck);
        },
    ClearSelectedDeck({commit}, deck){
        commit("CLEAR_DECK", deck)
     }
    }
}