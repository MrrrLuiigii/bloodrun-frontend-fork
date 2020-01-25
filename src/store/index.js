import Vue from "vue";
import Vuex from "vuex";

import chatModule from "./chatModule";
import playerModule from "./playerModule";
import friendModule from "./friendModule";
import lobbyModule from "./lobbyModule";
import websocketModule from "./websocketModule";
import gamePlayerModule from "./gamePlayerModule";
import hostModule from "./hostModule";
import gameModule from "./gameModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chatModule: chatModule,
    playerModule: playerModule,
    friendModule: friendModule,
    lobbyModule: lobbyModule,
    websocketModule: websocketModule,
    gamePlayerModule: gamePlayerModule,
    hostModule: hostModule,
    gameModule: gameModule
  }
});
