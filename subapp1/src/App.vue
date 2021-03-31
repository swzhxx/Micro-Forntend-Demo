<template>
  <div id="car-app">
    <keep-alive :include="include">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      include: "cacheRoute"
    })
  }
}
</script>

<style>
</style>
