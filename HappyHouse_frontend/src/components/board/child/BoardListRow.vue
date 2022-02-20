<template>
  <b-tr>
    <b-td>{{ articleno }}</b-td>
    <b-th class="text-left">
      <router-link
        class="router-link"
        :to="{ name: 'BoardView', params: { articleno: articleno } }"
        ><div @click="moveDetail">{{ subject }}</div></router-link
      >
    </b-th>
    <b-td>{{ userid }}</b-td>
    <b-td>{{ regtime }}</b-td>
    <b-td>{{ hit }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";
import { mapMutations } from "vuex";
const boardStore = "boardStore";
export default {
  name: "BoardListRow",
  props: {
    articleno: Number,
    userid: String,
    subject: String,
    hit: Number,
    regtime: String,
  },
  computed: {
    changeDateFormat() {
      return moment(new Date(this.regtime)).format("YYYY.MM.DD hh:mm:ss");
    },
  },
  methods: {
    ...mapMutations(boardStore, ["SET_ARTICLE"]),
    moveDetail() {
      console.log(this.articleno + " BoardListRow");
      this.SET_ARTICLE(this.articleno);
    },
  },
};
</script>

<style scoped>
.router-link {
  color: black;
}
</style>
