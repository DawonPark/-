<template>
  <b-container class="bv-example-row mt-3">
    <b-input-group class="mt-3">
      <b-form-input
        id="comment"
        v-model="comment"
        type="text"
        required
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-success" @click="moveWrite"
          >댓글 등록</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
const memberStore = "memberStore";
const boardStore = "boardStore";
import { writeMemo } from "@/api/memo";

export default {
  name: "CommentWrite",
  data() {
    return {
      comment: "",
      isUserid: false,
    };
  },
  computed: {
    ...mapState(boardStore, ["articleno"]),
    ...mapState(memberStore, ["memberInfo"]),
  },
  methods: {
    moveWrite() {
      console.log(this.articleno);
      writeMemo(
        {
          userid: this.memberInfo.userid,
          comment: this.comment,
          articleno: this.articleno,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
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

<style></style>
