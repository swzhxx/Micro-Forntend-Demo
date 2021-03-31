<template>
  <div>
    <h1>HelloHot</h1>
    <Input
      v-model="text"
      style="margin-top:100px"
    />
  </div>
</template>
<script>
import { Input } from 'element-ui'
export default {
  name: 'HelloHot',
  components: {
    Input
  },
  data() {
    return {
      text: ""
    }
  }
}
</script>