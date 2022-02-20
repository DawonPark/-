<template>
  <b-row>
    <b-col cols="9">
      <div id="map">
        <div id="search-box">
          <b-form-select
            style="width: 300px"
            v-model="selected"
            :options="options"
            @change="changeOption"
          >
          </b-form-select>
          <b-form @submit="searchHome" inline v-if="selected === 'apt'">
            <b-form-input
              style="width: 240px"
              v-model="searchInput"
            ></b-form-input>
            <b-button type="submit">검색</b-button>
          </b-form>
          <b-form @submit="searchHome" inline v-if="selected === 'local'">
            <b-form-select
              style="width: 100px"
              v-model="sidoSelected"
              :options="sido_options"
              @change="changeSido"
            >
            </b-form-select>
            <b-form-select
              style="width: 100px"
              v-model="gugunSelected"
              :options="gugun_options"
              @change="changeGugun"
            >
            </b-form-select>
            <b-form-select
              style="width: 100px"
              v-model="dongSelected"
              :options="dong_options"
            >
            </b-form-select>
            <div style="background-color: white; width: 300px">
              <label for="range-2">가격을 설정해주세요</label>
              <b-form-input
                id="range-2"
                v-model="value"
                type="range"
                min="0"
                max="50"
                step="0.5"
              ></b-form-input>
              <div class="mt-2">
                가격: {{ value }}억
                <b-button @click="changeDong" type="submit">검색</b-button>
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </b-col>
    <b-col cols="3">
      <router-view></router-view>
    </b-col>
  </b-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
const houseStore = "houseStore";
import {
  getAptNameList,
  getSidoList,
  getGugunList,
  getDongList,
  getAptList,
} from "@/api/map.js";
export default {
  /*global kakao*/
  name: "KakaoMap",
  data() {
    return {
      value: "20",
      map: null,
      markers: [],
      selected: null,
      sidoSelected: null,
      gugunSelected: null,
      dongSelected: null,
      options: [
        { value: null, text: "검색 옵션을 선택해주세요" },
        { value: "apt", text: "아파트 명으로 검색하기" },
        { value: "local", text: "지역으로 검색하기" },
      ],
      sido_options: [{ value: null, text: "시 선택" }],
      gugun_options: [{ value: null, text: "구 선택" }],
      dong_options: [{ vlaue: null, text: "동 선택" }],
      searchInput: "",
      aptList: [],
      aptMarkers: [],
      ps: null,
      infowindow: null,
      facilityMarker: [],
    };
  },
  mounted() {
    this.initMap();
    console.log(this.userLike);
    if (this.dong && this.setDongAptList(this.dong, "500"));
    if (this.input && this.setAptNameList(this.input));
    if (this.userLike) {
      this.displayMarker([[this.apt.lat, this.apt.lng]]);
      this.$router.push({ name: "MapDetail" }).catch(() => {});
    }
  },
  computed: {
    ...mapState(houseStore, ["dong", "input", "userLike", "apt"]),
  },

  methods: {
    ...mapMutations(houseStore, ["SET_APTLIST"]),
    setAptNameList(input) {
      getAptNameList(
        input,
        (response) => {
          this.SET_APTLIST(response.data);
          this.aptMarkers = [];
          response.data.forEach((apt) => {
            this.aptMarkers.push([apt.lat, apt.lng]);
          });
          this.displayMarker(this.aptMarkers);
        },
        () => {}
      );
    },
    setDongAptList(dong, dealAmount) {
      getAptList(
        dong,
        dealAmount,
        (response) => {
          this.SET_APTLIST(response.data);
          this.aptMarkers = [];
          response.data.forEach((apt) => {
            this.aptMarkers.push([apt.lat, apt.lng]);
          });
          console.log(this.aptMarkers);
          this.displayMarker(this.aptMarkers);
        },
        () => {}
      );
    },
    setPs(thema, current) {
      this.ps = new kakao.maps.services.Places(this.map);
      this.facilityMarker = [];
      this.facilityMarker.push(current);
      this.ps.categorySearch(thema, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < data.length; i++) {
          this.displayFacilityMarker(data[i]);
        }
      }
      this.displayMarker(this.facilityMarker);
    },
    displayFacilityMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      this.facilityMarker.push([place.y, place.x]);
    },

    searchHome(event) {
      event.preventDefault();
      this.$router.push({ name: "MapList" });
      if (this.selected === "apt") {
        this.setAptNameList(this.searchInput);
      }
      if (this.selected === "local") {
        this.setDongAptList(this.dongSelected);
      }
    },

    changeOption() {
      if (this.selected === "local") {
        getSidoList(
          (response) => {
            (this.sido_options = [{ value: null, text: "시 선택" }]),
              response.data.forEach((sido) => {
                this.sido_options.push({
                  value: sido.sidoCode,
                  text: sido.sidoName,
                });
              });
          },
          () => {}
        );
      }
    },

    changeSido() {
      getGugunList(
        this.sidoSelected,
        (response) => {
          this.gugunSelected = null;
          (this.gugun_options = [{ value: null, text: "구 선택" }]),
            response.data.forEach((gugun) => {
              this.gugun_options.push({
                value: gugun.gugunCode,
                text: gugun.gugunName,
              });
            });
        },
        () => {}
      );
    },
    changeGugun() {
      getDongList(
        this.gugunSelected,
        (response) => {
          this.dongSelected = null;
          (this.dong_options = [{ value: null, text: "동 선택" }]),
            response.data.forEach((dong) => {
              this.dong_options.push({
                value: dong.dongCode,
                text: dong.dongName,
              });
            });
        },
        () => {}
      );
    },
    changeDong() {
      console.log("체인지 동");
      console.log(this.value * 10);
      this.setDongAptList(this.dongSelected, this.value * 10);
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },

    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
  },
};
</script>

<style>
#map {
  width: 1440px;
  height: 800px;
}
.first-row {
  padding: 0;
}
.second-row {
  width: 130px;
}
.third-row {
  width: 160px;
}
.apt-img {
  padding-top: 0;
}
.second-row:hover,
.third-row:hover {
  background-color: blanchedalmond;
}
#search-box {
  position: relative;
  top: 10px;
  left: 10px;
  z-index: 1000;
  width: 300px;
}
#scroller {
  height: 760px;
  overflow: auto;
}
#scroller::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
.apt-list:hover {
  background-color: red;
}
</style>
