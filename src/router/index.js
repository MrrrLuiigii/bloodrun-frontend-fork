import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/login/Login.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ "@/components/register/Register.vue"
        ),
      beforeEnter: authGuard
    },
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/components/home/Home.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/lobbies",
      name: "lobbies",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/Views/Lobby.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/gamelobby",
      name: "gamelobby",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/Views/GameLobby.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/reconnect",
      name: "reconnect",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ "@/components/game/gameReconnect.vue"
        ),
      beforeEnter: authGuard
    },
    {
      path: "/postgame",
      name: "postgame",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ "@/components/game/postGame.vue"
        ),
      beforeEnter: authGuard
    }
  ]
});
