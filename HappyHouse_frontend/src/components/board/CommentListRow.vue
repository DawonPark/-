<template>
  <div class="text-left">
    <div>
      {{ userid }} | {{ memotime }}
      <b-button
        variant="outline-info"
        class="mr-2"
        size="sm"
        @click="modifyMemoForm"
        v-if="userid === memberInfo.userid && !modifyForm"
        >수정</b-button
      >
      <b-button
        variant="outline-danger"
        class="mr-2"
        size="sm"
        @click="deleteMemo"
        v-if="userid === memberInfo.userid && !modifyForm"
        >삭제</b-button
      >
    </div>
    <div v-if="!modifyForm">
      <h5>{{ comment }}</h5>
    </div>
    <div v-if="modifyForm">
      <b-input v-model="modifyComment"></b-input>
      <b-button
        variant="outline-info"
        class="mr-2"
        size="sm"
        @click="modifyMemo"
        >수정</b-button
      >
      <b-button
        variant="outline-info"
        class="mr-2"
        size="sm"
        @click="modifyMemoForm"
        >취소</b-button
      >
    </div>
  </div>
</template>

<script>
import { deleteMemo, modifyMemo } from "@/api/memo";
import moment from "moment";
import { mapState } from "vuex";
const memberStore = "memberStore";
const boardStore = "boardStore";
export default {
  props: {
    userid: String,
    memotime: String,
    comment: String,
    memono: Number,
  },
  data() {
    return {
      modifyForm: false,
      modifyComment: "",
    };
  },
  mounted() {
    this.modifyComment = this.comment;
  },
  computed: {
    ...mapState(boardStore, ["articleno"]),
    ...mapState(memberStore, ["memberInfo"]),

    changeDateFormat() {
      return moment(new Date(this.memotime)).format("YYYY.MM.DD hh:mm:ss");
    },
  },
  methods: {
    deleteMemo() {
      console.log(this.memono);
      if (confirm("삭제하시겠습니까?")) {
        deleteMemo(this.memono, () => {
          this.$router.go();
        });
      }
    },
    modifyMemoForm() {
      this.modifyForm = !this.modifyForm;
    },
    modifyMemo() {
      modifyMemo(
        {
          comment: this.modifyComment,
          memono: this.memono,
          userid: "",
        },
        () => {
          this.$router.go();
        },
        () => {}
      );
    },
  },
};
</script>

<style></style>
