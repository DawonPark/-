<template>
  <b-row>
    <b-col>
      <h1>정말 탈퇴하시겠습니까?</h1>
      <div class="mt-3">
        탈퇴 사유를 적어주시면 감사하겠습니다.<b-input
          placeholder="탈퇴사유를 적어주세요"
          class="mt-2"
          v-model="content"
        ></b-input>
      </div>
      <div class="mt-3">
        <b-button variant="danger" @click="onDelete">탈퇴하기</b-button>
        <b-button variant="primary" @click="moveHome">돌아가기</b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const memberStore = "memberStore";
export default {
  data() {
    return {
      content: "",
    };
  },
  computed: {
    ...mapState(memberStore, [
      "memberInfo",
      "isDeleteError",
      "isDelete",
      "isFeedback",
      "isFeedbackError",
    ]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_MEMBER_INFO"]),
    ...mapActions(memberStore, ["memberDelete", "memberFeedback"]),
    moveHome() {
      this.$router.push({ name: "Home" });
    },
    onDelete() {
      this.memberDelete(this.memberInfo.userid);
      this.memberFeedback(this.content);

      alert("회원 정보가 삭제되었습니다");
      this.SET_IS_LOGIN(false);
      this.SET_MEMBER_INFO(null);
      sessionStorage.removeItem("access-token");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
