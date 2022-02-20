<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left"> </b-col>
      <b-col class="text-right">
        <b-button
          variant="outline-info"
          @click="moveModifyArticle"
          class="mr-2"
          v-if="memberInfo.userid === `admin`"
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
        <h1 class="mb-4">{{ article.subject }}</h1>
        <p class="mb-4">
          글쓴이 : {{ article.userid }} , 조회수 : {{ article.hit }} , 작성일 :
          {{ article.regtime }}
        </p>
        <hr />
        <h4>{{ article.content }}</h4>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
const memberStore = "memberStore";
import { getArticle, deleteArticle } from "@/api/notice";

export default {
  data() {
    return {
      article: {},
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
      },
      (error) => {
        console.log("글을 삭제하던 도중 에러가 발생했습니다.", error);
      }
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "NoticeList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "NoticeUpdate",
        params: { articleno: this.article.articleno },
      });
    },
    removeArticle() {
      if (confirm("삭제하시겠습니까?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "NoticeList" });
        });
      }
    },
  },
};
</script>

<style></style>
