<template>
  <b-container class="mt-4" v-if="memberInfo">
    <b-row> </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron bg-variant="light">
          <template #header>회원 정보 상세</template>
          <hr class="my-4" />

          <b-container class="mt-4">
            <b-list-group>
              <b-list-group-item
                >아이디 : {{ memberInfo.userid }}</b-list-group-item
              >
              <b-list-group-item
                >이름 : {{ memberInfo.username }}</b-list-group-item
              >
              <b-list-group-item
                >이메일 : {{ memberInfo.email }}</b-list-group-item
              >
              <b-list-group-item
                >회원 가입 날짜 : {{ memberInfo.joindate }}</b-list-group-item
              >
            </b-list-group>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" href="#" class="mr-1" @click="movePage"
            >정보수정</b-button
          >
          <b-button variant="danger" href="#" @click="deletePage"
            >회원탈퇴</b-button
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
  },
  methods: {
    movePage() {
      this.$router.push({ name: "MemberModify" });
    },
    deletePage() {
      this.$router.push({ name: "MemberDelete" });
    },
  },
};
</script>

<style></style>
