<template>
  <div>
    <b-row>
      <h2>회원 관리</h2>
    </b-row>
    <b-row class="mt-5 mb-5">
      <b-col>
        <b-table-simple hover responsive>
          <b-thead>
            <b-tr>
              <b-th class="userid">유저 아이디</b-th>
              <b-th class="userid">유저 이름</b-th>
              <b-th class="userid">유저 이메일</b-th>
              <b-th class="password">유저 비밀번호</b-th>
              <b-th class="password">가입일</b-th>
              <b-th class="delete">삭제</b-th>
            </b-tr>
          </b-thead>
          <!-- <member-row
            v-for="(member, index) in memberList"
            :key="index"
            v-bind="member"
          ></member-row> -->
          <tbody v-for="(member, index) in memberList" :key="index">
            <td>{{ member.userid }}</td>
            <td>{{ member.username }}</td>
            <td>{{ member.email }}</td>
            <td>{{ member.userpwd }}</td>
            <td>{{ member.userid }}</td>
            <td>
              <b-button
                v-if="!(member.userid === 'admin')"
                variant="danger"
                @click="removeUser(index)"
                >삭제</b-button
              >
            </td>
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import MemberRow from "./MemberRow.vue";
const adminStore = "adminStore";
export default {
  components: {
    // MemberRow,
  },
  computed: {
    ...mapState(adminStore, ["memberList"]),
  },
  created() {
    this.getUserList();
  },
  methods: {
    ...mapActions(adminStore, ["getUserList", "deleteUser"]),
    removeUser(idx) {
      this.deleteUser({
        userid: this.memberList[idx].userid,
        index: idx,
      });
    },
  },
};
</script>

<style></style>
