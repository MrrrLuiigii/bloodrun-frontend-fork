export default {
    state: {
        gamePlayer: {
            deck:{
                deckId: null,
                userId: null,
                name: null,
                cards: null
            },
            cardsInHand: null,
            cardsInDeck: null,
            lobbyPlayerStatus: "NotReady",
            email: null,
            userId: null,
            username: null,
            accountStatus: null,
            session: null
            
        },
    },
    mutations: {
    SAVE_GAME_PLAYER(state, player) {
         state.gamePlayer = player
      },
    },
    getters: {
    getGamePlayer: state => {
        return state.gamePlayer;
        },  
    },
    actions: {
        SaveGamePlayer({commit}, player){
            commit("SAVE_GAME_PLAYER", player)
         }
    }
}