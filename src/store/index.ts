import Vue from "vue";
import Vuex from "vuex";
import Minecraft from "./modules/minecraft";
import Metamask from "@/store/modules/metamask";
import Moonsama from "@/store/modules/moonsama";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Minecraft,
    Metamask,
    Moonsama,
  },
});
