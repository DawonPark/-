<template>
  <div class="navi">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="navbar navbar-expand-sm navbar"
    >
      <b-navbar variant="faded" type="light">
        <router-link to="/">
          <b-navbar-brand>
            <div>
              <img
                src="@/assets/logo.png"
                class="d-inline-block align-top"
                alt="Kitten"
                width="80"
              />
            </div>
          </b-navbar-brand>
        </router-link>
      </b-navbar>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-1">
          <b-nav-item href="#" @click="moveSearchPage"
            ><router-link class="router-link" :to="{ name: 'Map' }">
              <div v-b-hover="handlehHover">
                <b-icon
                  v-if="ishHovered"
                  icon="house-fill"
                  animation="throb"
                  scale="2"
                ></b-icon>
                <b-icon v-else icon="house"></b-icon>
                <span :class="ishHovered ? 'text-white' : ''"
                  >집 구하러 가기</span
                >
              </div>
            </router-link></b-nav-item
          >
          <b-nav-item href="#" class="mr-1">
            <router-link :to="{ name: 'Board' }" class="router-link">
              <div v-b-hover="handlebHover">
                <b-icon
                  v-if="isbHovered"
                  icon="clipboard-check"
                  animation="throb"
                  scale="2"
                ></b-icon>
                <b-icon v-else icon="clipboard"></b-icon>
                <span :class="isbHovered ? 'text-white' : ''">게시판</span>
              </div></router-link
            >
          </b-nav-item>
          <b-nav-item href="#" class="mr-1">
            <router-link :to="{ name: 'Qna' }" class="router-link"
              ><div v-b-hover="handleqHover">
                <b-icon
                  v-if="isqHovered"
                  icon="clipboard-check"
                  animation="throb"
                  scale="2"
                ></b-icon>
                <b-icon v-else icon="clipboard"></b-icon>
                <span :class="isqHovered ? 'text-white' : ''">QnA게시판</span>
              </div></router-link
            >
          </b-nav-item>
          <b-nav-item href="#">
            <router-link :to="{ name: 'Notice' }" class="router-link">
              <div v-b-hover="handlenHover">
                <b-icon
                  v-if="isnHovered"
                  icon="clipboard-check"
                  animation="throb"
                  scale="2"
                ></b-icon>
                <b-icon v-else icon="clipboard"></b-icon>
                <span :class="isnHovered ? 'text-white' : ''">공지사항</span>
              </div></router-link
            >
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="memberInfo">
          <b-nav-item class="align-self-center"
            ><div class="router-link" v-if="memberInfo.userid != `admin`">
              {{ memberInfo.username }}({{ memberInfo.userid }})님 환영합니다.
            </div></b-nav-item
          >
          <b-nav-item
            class="align-self-center"
            v-if="memberInfo.userid === 'admin'"
            ><router-link
              :to="{ name: 'Admin' }"
              class="link align-self-center router-link"
              >관리자 페이지</router-link
            ></b-nav-item
          >
          <b-nav-item class="align-self-center mr-1"
            ><router-link
              :to="{ name: 'MyPage' }"
              class="link align-self-center router-link"
              v-if="memberInfo.userid != `admin`"
              ><div v-b-hover="handlemHover">
                <b-icon
                  v-if="ismHovered"
                  icon="person-lines-fill"
                  animation="throb"
                  scale="2"
                ></b-icon>
                <b-icon v-else icon="person-lines-fill"></b-icon>
                <span :class="ismHovered ? 'text-white' : ''">내 정보</span>
              </div>
            </router-link></b-nav-item
          >
          <b-nav-item
            class="align-self-center mr-1"
            v-if="memberInfo.userid != `admin`"
            ><router-link
              :to="{ name: 'UserLike' }"
              class="link align-self-center router-link"
            >
              <div v-b-hover="handlejHover">
                <b-icon
                  v-if="isjHovered"
                  icon="heart-fill"
                  animation="throb"
                  scale="2"
                  variant="danger"
                ></b-icon>
                <b-icon v-else icon="heart"></b-icon>
                <span :class="isjHovered ? 'text-white' : ''">찜목록</span>
              </div></router-link
            ></b-nav-item
          >
          <b-nav-item
            class="link align-self-center mr-1"
            @click.prevent="onClickLogout"
          >
            <div class="router-link">
              로그아웃
            </div></b-nav-item
          >
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <router-link class="router-link" :to="{ name: 'SignIn' }">
              로그인</router-link
            ></b-nav-item
          >
          <b-nav-item href="#" class="ml-1"
            ><router-link class="router-link" :to="{ name: 'SignUp' }"
              >회원가입</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const memberStore = "memberStore";
const houseStore = "houseStore";
export default {
  data() {
    return {
      ishHovered: false,
      isbHovered: false,
      isqHovered: false,
      isnHovered: false,
      isjHovered: false,
      ismHovered: false,
      islHovered: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "memberInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_MEMBER_INFO"]),
    ...mapMutations(houseStore, ["SET_USERLIKE"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_MEMBER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
    moveSearchPage() {
      this.SET_USERLIKE(false);
    },
    handlehHover(hovered) {
      this.ishHovered = hovered;
    },
    handlebHover(hovered) {
      this.isbHovered = hovered;
    },
    handleqHover(hovered) {
      this.isqHovered = hovered;
    },
    handlenHover(hovered) {
      this.isnHovered = hovered;
    },
    handlejHover(hovered) {
      this.isjHovered = hovered;
    },
    handlemHover(hovered) {
      this.ismHovered = hovered;
    },
    handlelHover(hovered) {
      this.islHovered = hovered;
    },
  },
};
</script>

<style scope>
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");
* {
  font-family: "Jua", sans-serif;
}
.navi {
  font-family: "Jua", sans-serif;
  font-size: 20px;
}
</style>
