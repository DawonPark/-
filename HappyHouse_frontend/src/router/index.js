import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Admin from "../views/Admin.vue";
import AdminMemeber from "@/components/adminpage/AdminMember.vue";
import FeedBack from "@/components/adminpage/FeedBack.vue";

import Member from "../views/Member.vue";
import MemberLogin from "@/components/member/MemberLogin.vue";
import MemberJoin from "@/components/member/MemberJoin.vue";
import MemberMyPage from "@/components/member/MemberMyPage.vue";
import MemberModify from "@/components/member/MemberModify.vue";
import MemberDelete from "@/components/member/MemberDelete.vue";
import UserLike from "@/components/member/UserLike.vue";

import Board from "@/views/Board.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";

import KakaoMap from "@/views/Map.vue";
import MapList from "@/components/map/MapList.vue";
import MapDetail from "@/components/map/MapDetail.vue";

import Qna from "@/views/Qna.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaWrite from "@/components/qna/QnaWrite.vue";
import QnaView from "@/components/qna/QnaView.vue";
import QnaUpdate from "@/components/qna/QnaUpdate.vue";

import Notice from "@/views/Notice.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeWrite from "@/components/notice/NoticeWrite.vue";
import NoticeView from "@/components/notice/NoticeView.vue";
import NoticeUpdate from "@/components/notice/NoticeUpdate.vue";

import store from "@/store/index.js";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkMemberInfo"];
  const getUserInfo = store._actions["memberStore/getmemberInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "SignIn" });
  } else {
    console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    redirect: "/admin/adminmember",
    children: [
      {
        path: "adminmember",
        name: "AdminMemeber",
        component: AdminMemeber,
      },
      {
        path: "feedback",
        name: "FeedBack",
        component: FeedBack,
      },
    ],
  },
  {
    path: "/member",
    name: "Member",
    component: Member,
    children: [
      {
        path: "singin",
        name: "SignIn",
        component: MemberLogin,
      },
      {
        path: "singup",
        name: "SignUp",
        component: MemberJoin,
      },
      {
        path: "mypage",
        name: "MyPage",
        beforeEnter: onlyAuthUser,
        component: MemberMyPage,
      },
      {
        path: "membermodify",
        name: "MemberModify",
        beforeEnter: onlyAuthUser,
        component: MemberModify,
      },
      {
        path: "memberdelete",
        name: "MemberDelete",
        beforeEnter: onlyAuthUser,
        component: MemberDelete,
      },
    ],
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        beforeEnter: onlyAuthUser,
        component: BoardList,
      },
      {
        path: "write",
        name: "BoardWrite",
        component: BoardWrite,
      },
      {
        path: "detail/:articleno",
        name: "BoardView",
        component: BoardView,
      },
      {
        path: "update/:articleno",
        name: "BoardUpdate",
        component: BoardUpdate,
      },
      {
        path: "userlike",
        name: "UserLike",
        component: UserLike,
      },
    ],
  },
  {
    path: "/map",
    name: "Map",
    component: KakaoMap,
    children: [
      {
        path: "list",
        name: "MapList",
        component: MapList,
      },
      {
        path: "detail",
        name: "MapDetail",
        component: MapDetail,
      },
    ],
  },
  {
    path: "/qna",
    name: "Qna",
    component: Qna,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        beforeEnter: onlyAuthUser,
        component: QnaList,
      },
      {
        path: "write",
        name: "QnaWrite",
        component: QnaWrite,
      },
      {
        path: "detail/:articleno",
        name: "QnaView",
        component: QnaView,
      },
      {
        path: "update/:articleno",
        name: "QnaUpdate",
        component: QnaUpdate,
      },
    ],
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "NoticeList",
        beforeEnter: onlyAuthUser,
        component: NoticeList,
      },
      {
        path: "write",
        name: "NoticeWrite",
        component: NoticeWrite,
      },
      {
        path: "detail/:articleno",
        name: "NoticeView",
        component: NoticeView,
      },
      {
        path: "update/:articleno",
        name: "NoticeUpdate",
        component: NoticeUpdate,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
