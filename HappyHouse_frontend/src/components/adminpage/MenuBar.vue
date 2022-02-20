<template>
  <div>
    <b-dropdown
      text="메뉴"
      block
      variant="primary"
      class="m-2"
      menu-class="w-100"
    >
      <b-dropdown-item @click="moveMember">회원 정보 조회</b-dropdown-item>
      <b-dropdown-item @click="moveFeedBack">탈퇴 사유 조회</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  methods: {
    moveMember() {
      this.$router.push({ name: "AdminMemeber" });
    },
    moveFeedBack() {
      this.$router.push({ name: "FeedBack" });
    },
  },
};
</script>

<style scope></style>
