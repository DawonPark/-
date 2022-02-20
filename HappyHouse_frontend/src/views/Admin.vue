<template>
  <div>
    <b-row>
      <b-col cols="2"> <menu-bar></menu-bar> </b-col>
      <b-col cols="10">
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MenuBar from "@/components/adminpage/MenuBar";

export default {
  name: "Admin",
  components: {
    MenuBar,
  },
};
</script>

<style scoped></style>
