<template>
  <b-container class="mt-5 mb-5">
    <b-row>
      <b-col>
        <h3>회원 가입</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 mb-3"
        >간편하게 가입하고 <br />서비스를 이용하세요
      </b-col>
    </b-row>
    <div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group label="아이디:" label-for="input-2">
          <b-form-input
            v-model="form.userid"
            placeholder="아이디를 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호:" label-for="input-2">
          <b-form-input
            v-model="form.userpwd"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="이름:" label-for="input-2">
          <b-form-input
            v-model="form.username"
            placeholder="이름을 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email :" label-for="input-1">
          <b-form-input
            v-model="form.email"
            type="email"
            placeholder="email을 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">회원 가입하기</b-button>
        <b-button type="reset" variant="danger" class="ml-2">취소</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  data() {
    return {
      form: {
        userid: "",
        email: "",
        username: "",
        userpwd: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isRegist", "isRegistError"]),
  },
  methods: {
    ...mapActions(memberStore, ["memberRegister"]),
    async onSubmit(event) {
      event.preventDefault();
      await this.memberRegister(this.form);
      if (this.isRegist) {
        alert("회원 가입에 성공했습니다.");
        this.$router.push({ name: "SignIn" });
      } else {
        alert("회원가입 실패");
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.username = "";
      this.form.userid = "";
      this.form.userpwd = "";
    },
  },
};
</script>

<style scoped></style>
