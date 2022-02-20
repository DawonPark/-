import { apiInstance } from "./index.js";

const api = apiInstance();

async function getAptNameList(aptName, success, fail) {
  api.get(`map/apt/${aptName}`).then(success).catch(fail);
}

async function getSidoList(success, fail) {
  api.get(`map/sido`).then(success).catch(fail);
}

async function getGugunList(sidoCode, success, fail) {
  let sido = { sido: sidoCode };
  api.get(`map/gugun`, { params: sido }).then(success).catch(fail);
}

async function getDongList(gugunCode, success, fail) {
  let gugun = { gugun: gugunCode };
  api.get(`map/dong`, { params: gugun }).then(success).catch(fail);
}

async function getAptList(dongCode, dealAmount, success, fail) {
  console.log("api" + dongCode + dealAmount);
  let dong = { dong: dongCode, dealAmount: dealAmount };
  api.get(`map/apt`, { params: dong }).then(success).catch(fail);
}

export { getAptNameList, getSidoList, getGugunList, getDongList, getAptList };
