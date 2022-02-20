<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button
          v-b-toggle.collapse-1
          variant="outline-primary"
          class="mr-2"
          v-if="memberInfo.userid === `admin`"
          >답변 등록</b-button
        >
        <b-button
          variant="outline-danger"
          class="mr-2"
          v-if="memberInfo.userid === `admin`"
          @click="answerdelete"
        >
          답변 삭제</b-button
        >

        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <b-input
              placeholder="답변을 입력하세요.."
              class="mb-2"
              id="answer"
              v-model="answer"
              type="text"
            ></b-input>
            <b-button @click="answerwrite">저장</b-button>
          </b-card>
        </b-collapse>
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="outline-info"
          @click="moveModifyArticle"
          class="mr-2"
          v-if="memberInfo.userid === this.article.userid"
          >수정</b-button
        >

        <b-button
          variant="outline-danger"
          @click="removeArticle"
          v-if="memberInfo.userid === this.article.userid"
          class="mr-2"
          >삭제</b-button
        >
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
    </b-row>

    <div class="card text-left">
      <div class="card-body">
        <h1 class="ques">Q</h1>
        <h3 class="mb-3">제목 : {{ article.subject }}</h3>
        <h5 class="mb-3">
          글쓴이 : {{ article.userid }} , 조회수 : {{ article.hit }} , 작성일 :
          {{ article.regtime }}
        </h5>
        <hr />
        <h3>{{ article.content }}</h3>
      </div>
    </div>
    <!-- <div class="card text-left mt-1" v-if="article.answer 존재.."> -->
    <div class="card text-left mt-1" v-if="this.article.answer">
      <div class="card-body">
        <h1 class="answ">A</h1>
        <h2>{{ this.article.answer }}</h2>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
const memberStore = "memberStore";
import {
  getArticle,
  deleteArticle,
  writeAnswer,
  deleteAnswer,
} from "@/api/qna";

export default {
  data() {
    return {
      article: {},
      answer: "",
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
    ...mapState(memberStore, ["memberInfo"]),
  },
  created() {
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
        this.answer = this.article.answer;
      },
      (error) => {
        console.log("글을 삭제하던 도중 에러가 발생했습니다.", error);
      }
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "QnaList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "QnaUpdate",
        params: { articleno: this.article.articleno },
      });
    },
    moveWrite() {
      this.$router.push({ name: "QnaWrite" });
    },
    removeArticle() {
      if (confirm("삭제하시겠습니까?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "QnaList" });
        });
      }
    },
    answerdelete() {
      deleteAnswer(
        {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
          answer: "",
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.$router.go();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    answerwrite() {
      writeAnswer(
        {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
          answer: this.answer,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.$router.go();
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.ques {
  color: blue;
  margin-bottom: 10px;
}
.answ {
  color: red;
  margin-bottom: 5px;
}
</style>
