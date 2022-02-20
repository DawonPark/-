const houseStore = {
  namespaced: true,
  state: {
    aptList: [],
    apt: {},
    dong: null,
    input: null,
    userLike: false,
  },
  mutations: {
    SET_APTLIST: (state, aptList) => {
      state.aptList = aptList;
    },
    SET_APT: (state, apt) => {
      state.apt = apt;
    },
    SET_DONG: (state, dong) => {
      if (state.input) state.input = null;
      state.dong = dong;
    },
    SET_INPUT: (state, input) => {
      if (state.dong) state.dong = null;
      state.input = input;
    },
    SET_USERLIKE: (state, userLike) => {
      state.userLike = userLike;
    },
  },
};
export default houseStore;
