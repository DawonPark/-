import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import adminStore from "@/store/modules/adminStore";
import memberStore from "@/store/modules/memberStore";
import houseStore from "@/store/modules/houseStore";
import boardStore from "@/store/modules/boardStore";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    adminStore,
    memberStore,
    houseStore,
    boardStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
