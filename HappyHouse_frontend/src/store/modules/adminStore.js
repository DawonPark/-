import { getUserList, deleteMember } from "@/api/member.js";
const adminStore = {
  namespaced: true,
  state: {
    memberList: [],
  },
  mutations: {
    SET_USERLIST(state, data) {
      state.memberList = data;
    },
    DELETE_USER(state, index) {
      state.memberList.splice(index, 1);
      console.log(state.memberList);
    },
  },
  actions: {
    getUserList({ commit }) {
      getUserList(({ data }) => {
        commit("SET_USERLIST", data);
      });
    },
    deleteUser({ commit }, payload) {
      deleteMember(payload.userid, ({ data }) => {
        if (data == "success") {
          commit("DELETE_USER", payload.index);
        }
      });
    },
  },
};
export default adminStore;
