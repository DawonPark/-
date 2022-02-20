import jwt_decode from "jwt-decode";
import {
  login,
  findById,
  registerMember,
  modifyMember,
  deleteMember,
  insertFeedback,
} from "@/api/member.js";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    memberInfo: null,
    isRegist: false,
    isRegistError: false,
    isModify: false,
    isModifyError: false,
    isDelete: false,
    isDeleteError: false,
    isFeedback: false,
    isFeedbackError: false,
  },
  getters: {
    checkMemberInfo: function (state) {
      return state.memberInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_MEMBER_INFO: (state, memberInfo) => {
      state.isLogin = true;
      state.memberInfo = memberInfo;
    },
    SET_IS_REGIST: (state, isRegist) => {
      state.isRegist = isRegist;
    },
    SET_IS_REGIST_ERROR: (state, isRegistError) => {
      state.isRegistError = isRegistError;
    },
    SET_IS_MODIFY: (state, isModify) => {
      state.isModify = isModify;
    },
    SET_IS_MODIFY_ERROR: (state, isModifyError) => {
      state.isModifyError = isModifyError;
    },
    SET_IS_DELETE: (state, isDelete) => {
      state.isDelete = isDelete;
    },
    SET_IS_DELETE_ERROR: (state, isDeleteError) => {
      state.isDeleteError = isDeleteError;
    },
    SET_IS_FEEDBACK: (state, isFeedback) => {
      state.isFeedback = isFeedback;
    },
    SET_IS_FEEDBACK_ERROR: (state, isFeedbackEroor) => {
      state.isFeedbackEroor = isFeedbackEroor;
    },
  },
  actions: {
    async memberFeedback({ commit }, content) {
      await insertFeedback(
        content,
        (response) => {
          if (response.data === "success") {
            commit("SET_IS_FEEDBACK", true);
            commit("SET_IS_FEEDBACK_ERROR", false);
          } else {
            commit("SET_IS_FEEDBACK", false);
            commit("SET_IS_FEEDBACK_ERROR", true);
          }
        },
        () => {}
      );
    },
    async memberDelete({ commit }, memberid) {
      await deleteMember(memberid, (response) => {
        if (response.data === "success") {
          commit("SET_IS_DELETE", true);
          commit("SET_IS_DELETE_ERROR", false);
        } else {
          commit("SET_IS_DELETE", false);
          commit("SET_IS_DELETE_ERROR", true);
        }
      });
    },

    async memberModify({ commit }, member) {
      await modifyMember(
        member,
        (response) => {
          if (response.data === "success") {
            commit("SET_IS_MODIFY", true);
            commit("SET_IS_MODIFY_ERROR", false);
            let decode_token = jwt_decode(
              sessionStorage.getItem("access-token")
            );
            findById(
              decode_token.memberid,
              (response) => {
                if (response.data.message === "success") {
                  commit("SET_MEMBER_INFO", response.data.memberInfo);
                } else {
                  console.log("유저 정보 없음!!");
                }
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            commit("SET_IS_MODIFY", false);
            commit("SET_IS_MODIFY_ERROR", true);
          }
        },
        () => {}
      );
    },
    async memberRegister({ commit }, member) {
      await registerMember(
        member,
        (response) => {
          if (response.data === "success") {
            commit("SET_IS_REGIST", true);
            commit("SET_IS_REGIST_ERROR", false);
          } else {
            commit("SET_IS_REGIST", false);
            commit("SET_IS_REGIST_ERROR", true);
          }
        },
        () => {}
      );
    },
    async memberConfirm({ commit }, member) {
      await login(
        member,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getmemberInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.memberid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_MEMBER_INFO", response.data.memberInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
