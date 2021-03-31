<template>
  <div id="app">
    <NavBar></NavBar>
    <div style="display:flex;flex:1">
      <SideBar style="width:180px;flex:none"></SideBar>
      <div
        id="subapp"
        style='flex:1'
      >
        MainApp
      </div>
    </div>

  </div>
</template>

<script>

import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
export default {
  name: 'App',
  components: {
    SideBar, NavBar
  }
}
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
