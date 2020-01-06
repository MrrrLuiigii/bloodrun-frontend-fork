import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import the Auth0 configuration
import { domain, clientId, audience,prompt } from "@/auth/auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

import vuetify from './plugins/vuetify';

// register the plugin on vue
import Toasted from 'vue-toasted';
 
Vue.use(Toasted)
 

import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://localhost:8082/ws/', {
reconnection: true, // (Boolean) whether to reconnect automatically (false)
reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

// Install the authentication plugin here
Vue.use( Auth0Plugin, {
  domain,
  clientId,
  audience,
  prompt,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')