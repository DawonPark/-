import { apiInstance } from "./index.js";

const api = apiInstance();

async function listMemo(articleno, success, fail) {
  await api.get(`/memo/${articleno}`).then(success).catch(fail);
}

function writeMemo(article, success, fail) {
  api.post(`/memo`, JSON.stringify(article)).then(success).catch(fail);
}

function modifyMemo(article, success, fail) {
  console.log(JSON.stringify(article));
  api.put(`/memo`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteMemo(memono, success, fail) {
  api.delete(`/memo/${memono}`).then(success).catch(fail);
}

export { listMemo, writeMemo, modifyMemo, deleteMemo };
