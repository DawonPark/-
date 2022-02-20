<template>
  <b-container>
    <div>
      <h2 class="mt-5">회원 찜 목록</h2>
    </div>
    <div class="mt-5">
      <b-row>
        <b-col>
          <b-table-simple hover responsive>
            <b-thead>
              <b-tr>
                <b-th>아파트 이름</b-th>
                <b-th>위치</b-th>
                <b-th>가격</b-th>
              </b-tr>
            </b-thead>
            <user-like-row
              v-for="(UserLike, index) in userLikeList"
              :key="index"
              v-bind="UserLike"
            />
          </b-table-simple>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import UserLikeRow from "./UserLikeRow.vue";
import { mapState } from "vuex";
import { getUserLike } from "@/api/member.js";
const memberStore = "memberStore";
export default {
  data() {
    return {
      userLikeList: [],
    };
  },
  components: {
    UserLikeRow,
  },
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
  },
  created() {
    getUserLike(this.memberInfo.userid, ({ data }) => {
      this.userLikeList = data;
      console.log(this.userLikeList);
    });
  },
};
</script>

<style></style>
