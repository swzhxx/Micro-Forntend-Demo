import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'
import microsApps from './microapps'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import globalState from '@/store/store-plugin/globalState'

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')

registerMicroApps(
  microsApps.map((ma) => {
    return {
      ...ma,
      props: {
        globalState,
      },
    }
  })
)

start({ prefetch: false })
