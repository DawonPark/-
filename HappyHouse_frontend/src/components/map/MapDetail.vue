<template>
  <div>
    <div style="height: 42px">
      <h4>{{ apt.aptName }}</h4>
    </div>
    <div>
      <b-card tag="article" style="max-width: 50rem" class="mb-2">
        <b-card-img
          :src="require('@/assets/logo.png')"
          alt="Image"
          class="rounded-0"
          style="height: 300px"
        ></b-card-img>
        <b-card-text id="house-scroller">
          <b-list-group>
            <b-list-group-item>
              주소 : {{ apt.sidoName }} {{ apt.gugunName }}
              {{ apt.dongName }}</b-list-group-item
            >
            <b-list-group-item
              >건축년도 : {{ apt.buildYear }}</b-list-group-item
            >
            <b-list-group-item>면적 : {{ apt.area }}</b-list-group-item>
            <b-list-group-item>층 : {{ apt.floor }}</b-list-group-item>
            <b-list-group-item>가격 : {{ apt.dealAmount }}</b-list-group-item>
            <b-list-group-item
              >편의시설 :
              <b-form-select
                style="width: 300px"
                v-model="selected"
                :options="options"
                @change="changeOption"
              >
              </b-form-select>
            </b-list-group-item>
            <b-list-group-item
              ><div id="roadview" style="width: 100%; height: 300px"></div
            ></b-list-group-item>
            <b-list-group-item v-if="memberInfo"
              ><b-button v-if="!check" @click="registerUserLike"
                >관심지역 설정하기</b-button
              ><b-button v-if="check" @click="removeUserLike"
                >관심지역 해제하기</b-button
              ></b-list-group-item
            >
          </b-list-group>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { insertUserLike, getUserLike, deleteUserLike } from "@/api/member.js";
const houseStore = "houseStore";
const memberStore = "memberStore";
export default {
  data() {
    return {
      options: [
        { value: null, text: "검색 옵션을 선택해주세요" },
        { value: "MT1", text: "대형마트 검색하기" },
        { value: "PS3", text: "어린이집,유치원 검색하기" },
        { value: "SC4", text: "학교 검색하기" },
        { value: "CS2", text: "편의점 검색하기" },
        { value: "AC5", text: "학원 검색하기" },
        { value: "SW8", text: "지하철역 검색하기" },
        { value: "CT1", text: "문화시설 검색하기" },
        { value: "SW8", text: "지하철역 검색하기" },
        { value: "FD6", text: "음식점 검색하기" },
        { value: "SW8", text: "지하철역 검색하기" },
        { value: "CE7", text: "카페 검색하기" },
        { value: "HP8", text: "병원 검색하기" },
        { value: "PM9", text: "약국 검색하기" },
      ],
      selected: null,
      check: false,
    };
  },
  created() {
    console.log(this.userLike);
    if (!this.userLike) {
      this.$parent.displayMarker([[this.apt.lat, this.apt.lng]]);
    }
    getUserLike(this.memberInfo.userid, ({ data }) => {
      console.log("userLikeList");
      data.forEach((element) => {
        if (
          this.apt.floor === element.floor &&
          this.apt.area === element.area
        ) {
          this.check = true;
          return;
        }
      });
    });
  },
  mounted() {
    var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    var roadview = new window.kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    var roadviewClient = new window.kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    var position = new window.kakao.maps.LatLng(this.apt.lat, this.apt.lng);
    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      if (panoId) {
        roadview.setPanoId(panoId, position);
      } else {
        roadviewContainer.remove();
      }
    });
  },
  computed: {
    ...mapState(houseStore, ["apt", "userLike"]),
    ...mapState(memberStore, ["memberInfo"]),
  },
  methods: {
    ...mapMutations(houseStore, ["SET_USERLIKE"]),
    changeOption() {
      this.$parent.setPs(this.selected, [this.apt.lat, this.apt.lng]);
    },
    registerUserLike() {
      insertUserLike(
        {
          userid: this.memberInfo.userid,
          aptName: this.apt.aptName,
          dongName: this.apt.dongName,
          sidoName: this.apt.sidoName,
          lat: this.apt.lat,
          lng: this.apt.lng,
          dealAmount: this.apt.dealAmount,
          area: this.apt.area,
          floor: this.apt.floor,
          gugunName: this.apt.gugunName,
          buildYear: this.apt.buildYear,
        },
        ({ data }) => {
          if (data === "success") {
            this.check = !this.check;
          }
        }
      );
    },
    removeUserLike() {
      deleteUserLike(
        this.apt.area,
        this.apt.floor,
        this.memberInfo.userid,
        ({ data }) => {
          if (data === "success") {
            this.check = !this.check;
          }
        }
      );
    },
  },
};
</script>

<style>
#house-detail {
  height: 500px;
}
#house-scroller {
  height: 420px;
  overflow: auto;
}
#house-scroller::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
