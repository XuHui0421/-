<template>
  <div id="app">
        <div class="content" v-if="['/login','/forgetPass','/notFound'].indexOf($route.path) == -1">
            <nav-menu activeTab="data"></nav-menu> 
            <div class="main h-full">
                    <welcome></welcome>
                    <router-view/>
            </div>
        </div>
	    <router-view v-if="['/login','/forgetPass','/notFound'].indexOf($route.path) != -1"/>
  </div>
</template>

<script>
import NavMenu from "./components/navMenu.vue";
import Welcome from "./components/header.vue";
export default {
  name: "App",
  components: {
    NavMenu,
    Welcome
  },
  created() {
  }
};
</script>

<style lang="less">
@import "./assets/css/common.less";
@import "./assets/css/base.css";

#app {
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100%;
  overflow: auto;
  font-size: 14px;
}
</style>
