<template>
  <div class="tags">
    <Tag
      style="margin-right:10px"
      v-for="(tag , index) in tags"
      closable
      :key="index"
      @close="()=>handleClose(tag)"
      @click="handleClick(tag)"
      :type="activemenu && activemenu.name == tag.name ? 'success':''"
    >{{tag.name}}</Tag>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { Tag } from 'element-ui'
export default {
  components: {
    Tag
  },
  computed: {
    ...mapState(['tags', 'menus'])
  },
  data() {
    return {
      activemenu: undefined
    }
  },
  mounted() {
    window.addEventListener("popstate", this.onPopState)
  },
  methods: {
    ...mapActions(["removeTag", "addTag"]),
    matchActiveMenu(href) {
      const matchMenu = this.menus.find(menu => href.indexOf(menu.path) > -1)
      this.activemenu = matchMenu
      if (matchMenu) {
        this.addTag(matchMenu)
      }
    },
    handleClose(tag) {
      const index = this.tags.findIndex(_tag => _tag.name == tag.name)

      let nextActivemenu = { path: '/' };
      let nextIndex = index
      if (this.tags.length > 1) {
        if (index > 0) {
          nextIndex--
        } else if (this.tags.length) {
          nextIndex++
        }
        nextActivemenu = this.menus.find(menu => menu.name == this.tags[nextIndex].name)
      }
      this.removeTag(tag)
      history.replaceState(null, nextActivemenu.path, nextActivemenu.path)
      //查找上一个节点

    },
    handleClick(tag) {
      history.pushState(null, tag.path, tag.path)
    },
    onPopState() {
      // console.log(`onPopState`, e)
      const href = window.location.href;
      this.matchActiveMenu(href)
    }
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.onPopState)
  },
}
</script>
<style lang="less" scoped>
.tags {
  height: 50px;
  display: flex;
  border-bottom: 1px solid gray;
  width: 100%;
  align-items: center;
}
</style>