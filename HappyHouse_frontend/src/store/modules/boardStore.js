const boardStore = {
  namespaced: true,
  state: {
    articleno: null,
  },
  mutations: {
    SET_ARTICLE: (state, articleno) => {
      state.articleno = articleno;
    },
  },
};
export default boardStore;
