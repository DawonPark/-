<template>
  <tbody>
    <td>
      <a href="" @click="moveDetail">{{ aptName }}</a>
    </td>
    <td>{{ sidoName }} {{ gugunName }} {{ dongName }}</td>
    <td>{{ dealAmount }}만원</td>
  </tbody>
</template>

<script>
import { mapMutations } from "vuex";
const HouseStore = "houseStore";
export default {
  props: {
    aptCode: Number,
    aptName: String,
    area: String,
    sidoName: String,
    gugunName: String,
    dongName: String,
    buildYear: Number,
    dealAmount: String,
    lat: String,
    lng: String,
    floor: String,
    userid: String,
  },
  methods: {
    ...mapMutations(HouseStore, ["SET_APT", "SET_USERLIKE"]),
    moveDetail() {
      let params = {
        aptCode: this.aptCode,
        aptName: this.aptName,
        area: this.area,
        sidoName: this.sidoName,
        gugunName: this.gugunName,
        dongName: this.dongName,
        buildYear: this.buildYear,
        dealAmount: this.dealAmount,
        lat: this.lat,
        lng: this.lng,
        userid: this.userid,
        floor: this.floor,
      };
      this.SET_APT(params);
      this.SET_USERLIKE(true);
      this.$router.push({ name: "Map" });
    },
  },
};
</script>

<style></style>
