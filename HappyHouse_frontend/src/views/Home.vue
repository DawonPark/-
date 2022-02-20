<template>
  <div>
    <div
      class="main-container"
      :style="{
        backgroundImage: `url(${require('@/assets/main.jpg')})`,
      }"
    >
      <b-container>
        <b-row>
          <b-col class="mt-5"
            ><div class="mt-3"></div>
            <div class="display-4 font-weight-bold" align="center">
              구집 하러가기
            </div></b-col
          >
        </b-row>
        <b-row>
          <b-col class="mt-5"
            ><div class="mt-3"></div>
            <b-nav pills align="center">
              <b-nav-item class="rounded-pill"
                ><div class="nav-title" @click="selectLocal">
                  지역으로 검색하기
                </div></b-nav-item
              >
              <b-nav-item class="rounded-pill"
                ><div class="nav-title ml-1" @click="selectApt">
                  아파트로 검색하기
                </div></b-nav-item
              >
            </b-nav></b-col
          >
        </b-row>
        <b-row class="mt-2">
          <b-col v-if="selected === 'local'">
            <b-form-select
              style="width: 140px; height: 50px"
              class="rounded-pill"
              v-model="sidoSelected"
              :options="sido_options"
              @change="changeSido"
            >
            </b-form-select>
            <b-form-select
              style="width: 140px; height: 50px"
              class="rounded-pill"
              v-model="gugunSelected"
              :options="gugun_options"
              @change="changeGugun"
            >
            </b-form-select>
            <b-form-select
              style="width: 140px; height: 50px"
              class="rounded-pill"
              v-model="dongSelected"
              :options="dong_options"
            >
            </b-form-select>
            <b-button
              class="rounded-pill"
              style="height: 3.5rem"
              @click="moveMap"
              >검색</b-button
            >
          </b-col>
          <b-col v-if="selected === 'apt'">
            <input
              type="text"
              class="rounded-pill"
              style="width: 40rem; height: 4rem"
              v-model="searchInput"
              placeholder="   검색하세요"
            />
            <b-button class="rounded-pill" style="height: 4rem" @click="moveMap"
              >검색</b-button
            ></b-col
          ></b-row
        >
        <b-row class="mt-4">
          <b-col> </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="container my-5">
      <div class="row">
        <!--Item1-->
        <div class="col-lg-3 mb-5 mb-lg-0">
          <div class="hover hover-3 text-white rounded">
            <img src="../assets/lh.png" alt="" />
            <div class="hover-overlay"></div>
            <div class="hover-3-content px-5 py-4">
              <h3 class="hover-3-title text-uppercase font-weight-bold mb-1">
                <span class="font-weight-light"> </span>
              </h3>
              <p class="hover-3-description small text-uppercase mb-0">
                <b-link href="https://www.lh.or.kr/index.do">바로가기</b-link>
              </p>
            </div>
          </div>
        </div>
        <!--Item2-->
        <div class="col-lg-3 mb-3 mb-lg-0">
          <div class="hover hover-3 text-white rounded">
            <img src="../assets/finlife.png" alt="" />

            <div class="hover-overlay"></div>
            <div class="hover-3-content px-5 py-4">
              <h3 class="hover-3-title text-uppercase font-weight-bold mb-1">
                <span class="font-weight-light"> </span>
              </h3>
              <p class="hover-3-description small text-uppercase mb-0">
                <b-link href="http://finlife.fss.or.kr/main/main.do"
                  >바로가기</b-link
                >
              </p>
            </div>
          </div>
        </div>
        <!--Item3-->
        <div class="col-lg-3 mb-3 mb-lg-0">
          <div class="hover hover-3 text-white rounded">
            <img src="../assets/hf.png" alt="" />

            <div class="hover-overlay"></div>
            <div class="hover-3-content px-5 py-4">
              <h3 class="hover-3-title text-uppercase font-weight-bold mb-1">
                <span class="font-weight-light"></span>
              </h3>
              <p class="hover-3-description small text-uppercase mb-0">
                <b-link href="https://www.hf.go.kr/hf/index.do"
                  >바로가기</b-link
                >
              </p>
            </div>
          </div>
        </div>
        <!-- Item4   -->
        <div class="col-lg-3">
          <div class="hover hover-3 text-white rounded">
            <img src="../assets/nhuf.png" alt="" />

            <div class="hover-overlay"></div>
            <div class="hover-3-content px-5 py-4">
              <h3 class="hover-3-title text-uppercase font-weight-bold mb-1">
                <span class="font-weight-light"> </span>
              </h3>
              <p class="hover-3-description small text-uppercase mb-0">
                <b-link href="http://nhuf.molit.go.kr/">바로가기</b-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSidoList, getGugunList, getDongList } from "@/api/map.js";
import { mapMutations } from "vuex";
const houseStore = "houseStore";
export default {
  methods: {
    ...mapMutations(houseStore, ["SET_DONG", "SET_INPUT"]),
    moveMap() {
      if (this.selected === "local") this.SET_DONG(this.dongSelected);
      if (this.selected === "apt") this.SET_INPUT(this.searchInput);
      this.$router.push({ name: "MapList" });
    },
    selectLocal() {
      this.selected = "local";
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
    },
    selectApt() {
      this.selected = "apt";
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
  },
  data() {
    return {
      selected: "local",
      sidoSelected: null,
      gugunSelected: null,
      dongSelected: null,
      sido_options: [{ value: null, text: "시 선택" }],
      gugun_options: [{ value: null, text: "구 선택" }],
      dong_options: [{ vlaue: null, text: "동 선택" }],
      searchInput: "",
    };
  },
  created() {
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
  },
};
</script>

<style scoped>
.nav-item {
  background-color: rgba(0, 0, 0, 0.65);
}
.nav-item:hover {
  background-color: transparent;
}
.nav-title {
  color: white;
}
.nav-title:hover {
  color: black;
  font-weight: bold;
}
.container {
  max-width: 1100px;
}
.hover {
  overflow: hidden;
  position: relative;
  padding-bottom: 50%;
}

.hover-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;
  transition: all 0.4s;
}

.hover img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s;
}

.hover-content {
  position: relative;
  z-index: 99;
}

/* DEMO 3 ============================== */
.hover-3::after {
  content: "";
  width: calc(100% - 3rem);
  height: calc(100% - 3rem);
  border: 1px solid #fff;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 90;
  transition: all 0.3s;
  transform: scale(1.1);
  opacity: 0;
  display: block;
  opacity: 0;
}

.hover-3-content {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
  z-index: 99;
}

.hover-3-description {
  opacity: 0;
  transform: scale(1.3);
  transition: all 0.3s;
}

.hover-3 img {
  width: 110%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hover-3 .hover-overlay {
  background: rgba(0, 0, 0, 0.2);
}

.hover-3:hover img {
  width: 100%;
}

.hover-3:hover::after {
  opacity: 1;
  transform: none;
}

.hover-3:hover .hover-3-description {
  opacity: 1;
  transform: none;
}

.hover-3:hover .hover-overlay {
  background: rgba(0, 0, 0, 0.8);
}
</style>
