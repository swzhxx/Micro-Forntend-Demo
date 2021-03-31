<template>
  <div
    class='side-bar'
    style="height:100%;position:relative;padding-left:10px"
  >
    <div
      class="item"
      v-for="(menu , index) in menus"
      :key="index"
      @click="goApp(menu)"
    >{{  menu.name  }}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SideBar',
  computed: {
    ...mapState(["menus"])
  },
  data() {
    return {

    }
  },
  methods: {
    // ...mapActions(["addTag"]),
    goApp(menu) {
      history.pushState(null, menu.name, menu.path);
      // this.addTag(menu)
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  font-size: 18px;
  padding: 15px 8px;
  text-align: right;
  border-bottom: 1px solid gray;
}
.side-bar {
  // padding-top: 10px;
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background: black;
    width: 1px;
  }
}
</style>