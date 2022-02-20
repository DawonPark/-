<template>
  <div>
    <h4>검색 목록</h4>
    <div id="scroller">
      <b-list-group horizontal v-for="(apt, index) in aptList" :key="index">
        <b-list-group-item class="first-row"
          ><img src="@/assets/logo.png" width="120px" height="100px"
        /></b-list-group-item>
        <b-list-group-item class="second-row" @click="moveDetail(index)">
          {{ apt.aptName }}</b-list-group-item
        >
        <b-list-group-item class="third-row">
          <div @click="moveDetail(index)">
            {{ apt.sidoName }} {{ apt.gugunName }} {{ apt.dongName }}
            <br />
            <br />
            거래가 : {{ apt.dealAmount }}
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const houseStore = "houseStore";
export default {
  computed: {
    ...mapState(houseStore, ["aptList"]),
  },
  methods: {
    ...mapMutations(houseStore, ["SET_APT"]),
    moveDetail(index) {
      this.SET_APT(this.aptList[index]);
      this.$router.push({ name: "MapDetail" });
    },
  },
};
</script>

<style></style>
