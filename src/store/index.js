// store/index.js
import { createStore } from "vuex";
import layout from "./modules/layout";
import auth from "./modules/auth";
import notice from "./modules/notice";
import dining from "./modules/dining";
import service from "./modules/service";
import theme from "./modules/theme";
import suggestion from "./modules/suggestion";
import pay from "./modules/pay";
import event from "./modules/event";

export default createStore({
  modules: {
    layout: {
      namespaced: true,
      ...layout,
    },
    auth: {
      namespaced: true,
      ...auth,
    },
    notice: {
      namespaced: true,
      ...notice,
    },
    dining: {
      namespaced: true,
      ...dining,
    },
    service: {
      namespaced: true,
      ...service,
    },
    theme: {
      namespaced: true,
      ...theme,
    },
    suggestion: {
      namespaced: true,
      ...suggestion,
    },
    pay: {
      namespaced: true,
      ...pay,
    },
    event: {
      namespaced: true,
      ...event,
    },
  },
});
