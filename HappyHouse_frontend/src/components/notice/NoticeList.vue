<template>
  <b-container>
    <div style="margin: 15px 0px">
      <b-col class="text-right">
        <b-button
          variant="outline-primary"
          style="margin-right: 5px"
          @click="moveWrite()"
          v-if="memberInfo.userid === `admin`"
          >등록</b-button
        >
        <b-button variant="outline-info" @click="moveList()">목록</b-button>
      </b-col>
    </div>
    <b-row>
      <b-col>
        <b-table-simple hover responsive>
          <b-thead>
            <b-tr>
              <b-th>번호</b-th>
              <b-th>제목</b-th>
              <b-th>글쓴이</b-th>
              <b-th>날짜</b-th>
              <b-th>조회수</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <notice-list-row
              v-for="(article, index) in articles"
              :key="index"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
    <div>
      <b-row>
        <b-col></b-col>
        <b-col></b-col>
        <b-col class="text-right">
          <b-input-group prepend="제목" class="mt-3">
            <b-form-input></b-form-input>
            <b-input-group-append>
              <b-button variant="info">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
const memberStore = "memberStore";
import axios from "axios";
import NoticeListRow from "@/components/notice/child/NoticeListRow";

export default {
  name: "NoticeList",
  components: {
    NoticeListRow,
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
  },
  created() {
    axios.get(`http://localhost:9999/happyhouse/notice`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "NoticeWrite" });
    },
  },
};
</script>

<style></style>
