<template>
  <b-tr>
    <b-td>{{ articleno }}</b-td>
    <b-th class="text-left">
      <router-link
        class="router-link"
        :to="{ name: 'NoticeView', params: { articleno: articleno } }"
        >{{ subject }}</router-link
      >
    </b-th>
    <b-td>{{ userid }}</b-td>
    <b-td>{{ regtime }}</b-td>
    <b-td>{{ hit }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "NoticeListRow",
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
};
</script>

<style scoped>
.router-link {
  color: black;
}
</style>
