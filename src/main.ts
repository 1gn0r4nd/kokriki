import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import vuetify from "./plugins/vuetify";
import pluginModule from "./plugins/modules";

Vue.config.productionTip = false;
Vue.use(pluginModule);

new Vue({
  // store: store,
  vuetify: vuetify,
  render: (h) => h(App),
}).$mount("#app");
