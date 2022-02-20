import { apiInstance } from "./index.js";

const api = apiInstance();

async function deleteUserLike(area, floor, userid, success, fail) {
  await api
    .delete(`/member/userlike/${area}/${floor}/${userid}`)
    .then(success)
    .catch(fail);
}
async function getFeedBackList(success, fail) {
  await api.get(`/member/feedback`).then(success).catch(fail);
}

async function getUserList(success, fail) {
  await api.get(`/member/user`).then(success).catch(fail);
}

async function getUserLike(userid, success, fail) {
  await api.get(`/member/userlike/${userid}`).then(success).catch(fail);
}
async function insertUserLike(house, success, fail) {
  await api
    .post(`/member/userlike`, JSON.stringify(house))
    .then(success)
    .catch(fail);
}
async function login(member, success, fail) {
  await api
    .post(`/member/login`, JSON.stringify(member))
    .then(success)
    .catch(fail);
}

async function findById(memberid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/member/info/${memberid}`).then(success).catch(fail);
}

async function registerMember(member, success, fail) {
  await api.post(`/member`, JSON.stringify(member)).then(success).catch(fail);
}

async function modifyMember(member, success, fail) {
  await api.put(`/member`, JSON.stringify(member)).then(success).catch(fail);
}

async function deleteMember(memberid, success, fail) {
  await api.delete(`/member/${memberid}`).then(success).catch(fail);
}

async function insertFeedback(content, success, fail) {
  await api
    .post(`/member/feedback`, JSON.stringify(content))
    .then(success)
    .catch(fail);
}

export {
  login,
  findById,
  registerMember,
  modifyMember,
  deleteMember,
  insertFeedback,
  insertUserLike,
  getUserLike,
  deleteUserLike,
  getUserList,
  getFeedBackList,
};
