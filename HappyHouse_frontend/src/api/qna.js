import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/qna`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/qna`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/qna/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/qna`, JSON.stringify(article)).then(success).catch(fail);
}

function writeAnswer(article, success, fail) {
  console.log(JSON.stringify(article));
  api.put(`/qna/answer`, JSON.stringify(article)).then(success).catch(fail);
}
function deleteAnswer(article, success, fail) {
  console.log(JSON.stringify(article));
  api
    .put(`/qna/deleteanswer`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/qna/${articleno}`).then(success).catch(fail);
}

export {
  listArticle,
  writeArticle,
  getArticle,
  modifyArticle,
  writeAnswer,
  deleteArticle,
  deleteAnswer,
};
