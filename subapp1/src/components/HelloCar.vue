<template>
  <div>
    <h1>HelloCar</h1>
    <!-- <Input style="margin-top:100px"></Input> -->
    <Button @click="handleOpenMessage">打开Message</Button>

    <Button @click="openDialog">打开Dialog</Button>
    <Button @click="goOtherPage">跳转到Vueapp 另个路由</Button>

    <Dialog :visible.sync="visible">
      Dialog!
    </Dialog>
  </div>
</template>
<script>
import { Message, Dialog, Button } from 'element-ui'
export default {
  name: 'HelloCar',
  components: {
    Dialog, Button
  },
  data() {
    return {
      visible: false,
      text: ""
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      console.log(`resize`)
    })
    window.addEventListener("click", () => {
      console.log(`click`)
    })
  },
  methods: {
    handleOpenMessage() {
      Message({
        message: 'text',
        duration: 30000
      })
    },
    openDialog() {
      this.visible = true
    },
    goOtherPage() {
      this.$router.push('/inner')
    }
  }
}
</script>