import { getModule } from "vuex-module-decorators";
import Vue from "vue";
import store from "@/store";
import Minecraft from "@/store/modules/minecraft";
import Metamask from "@/store/modules/metamask";
import Moonsama from "@/store/modules/moonsama";

export interface Modules {
  minecraft: Minecraft;
  metamask: Metamask;
  moonsama: Moonsama;
}

export default {
  install(_Vue: typeof Vue): void {
    const modules: Modules = {
      minecraft: getModule(Minecraft, store),
      metamask: getModule(Metamask, store),
      moonsama: getModule(Moonsama, store),
    };
    _Vue.prototype.$modules = modules;
  },
};
