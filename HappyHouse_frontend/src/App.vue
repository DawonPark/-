<template>
  <div id="app">
    <navi-bar />

    <router-view />

    <div class="footer mt-5">
      <div class>
        <p>
          (주)구집, 만든이 곽명필,박다원<br />
          Copyright © 2021 daejeon3-2. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NaviBar from "@/components/layout/NaviBar.vue";

export default {
  components: {
    NaviBar,
  },
  created() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-container {
  height: 500px;
  width: 100%;
}
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.router-link,
.router-link:hover {
  color: black;
  text-decoration: none;
}
</style>
