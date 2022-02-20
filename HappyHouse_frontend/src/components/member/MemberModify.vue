<template>
  <b-container class="mt-4" v-if="memberInfo">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron bg-variant="light">
          <template #header>회원 정보 변경</template>
          <hr class="my-4" />

          <b-container class="mt-4">
            <b-list-group>
              <b-list-group-item
                >이름 : <b-input type="text" v-model="memberInfo.username"
              /></b-list-group-item>
              <b-list-group-item
                >이메일 :<b-input type="email" v-model="memberInfo.email"
              /></b-list-group-item>
            </b-list-group>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" href="#" class="mr-1" @click="onModify"
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
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
export default {
  name: "MemberMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["memberInfo", "isModify", "isModifyError"]),
  },
  methods: {
    ...mapActions(memberStore, ["memberModify"]),
    onModify() {
      this.memberModify(this.memberInfo);
      if (this.isModify) {
        alert("회원 정보가 수정되었습니다.");
        this.$router.push({ name: "Home" });
      } else {
        alert("회원 정보 수정에 실패했습니다.");
      }
    },
    deletePage() {
      this.$router.push({ name: "MemberDelete" });
    },
  },
};
</script>

<style></style>
