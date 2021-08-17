import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import RequestAxie from "../views/RequestAxie.vue"
import ManagePool from "../views/ManagePool.vue"
import Matches from "../views/Matches.vue"
import SignIn from "../views/SignIn.vue"


Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/:uid?",
      name: "Home",
      component: Home
    },
    {
      path: "/request-axie:id/image",
      name: "RequestAxie",
      component: RequestAxie
    },
    {
      path: "/manage-pool",
      name: "ManagePool",
      component: ManagePool
    },
    {
      path: "/matches",
      name: "Matches",
      component: Matches
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn
    }
  ]
});

export default router;
