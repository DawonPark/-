<template>
  <b-container class="bv-example-row mt-3">
    <comment-list-row
      v-for="(memo, index) in memos"
      :key="index"
      v-bind="memo"
    />
  </b-container>
</template>

<script>
import CommentListRow from "./CommentListRow.vue";
import { listMemo } from "@/api/memo";
import { mapState } from "vuex";
const boardStore = "boardStore";
export default {
  name: "CommentList",
  components: {
    CommentListRow,
  },
  data() {
    return {
      memos: {},
    };
  },
  computed: {
    ...mapState(boardStore, ["articleno"]),
  },
  created() {
    listMemo(
      this.articleno,
      (response) => {
        this.memos = response.data;
        console.log(this.memos);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style></style>
