<template>
  <div>
    <b-row>
      <h2>탈퇴 사유</h2>
    </b-row>
    <b-row class="mt-5 mb-5">
      <b-col>
        <b-table-simple hover responsive>
          <b-thead>
            <b-tr>
              <b-th class="userid">탈퇴사유</b-th>
            </b-tr>
          </b-thead>
          <tbody v-for="(feedBack, index) in feedBackList" :key="index">
            <td>{{ feedBack.content }}</td>
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getFeedBackList } from "@/api/member.js";
export default {
  data() {
    return {
      feedBackList: [],
    };
  },
  created() {
    getFeedBackList(({ data }) => {
      this.feedBackList = data;
    });
  },
};
</script>

<style></style>
