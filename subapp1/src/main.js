import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import store from './store'
import './public-path'
import routes from './routers/index'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/global.less'

Vue.config.productionTip = false

Vue.use(Router)

const BASE = `vue_microapp`

let instance
let GlobalState

const render = (props = {}) => {
  const { container, globalState } = props
  GlobalState = globalState
  console.log(`props globalState`, globalState)

  props.onGlobalStateChange((state) => {
    // console.log(`subapp1 global state change`, state)
    GlobalState = state
  })

  window.ROUTER = new Router({
    base: BASE,
    routes,
    mode: 'history',
  })
  let router = window.ROUTER
  router.beforeEach((to, from, next) => {
    if (!to.meta || !to.meta.noCache) {
      store.dispatch('addCacheRoute', to.name)
    }
    next()
  })
  if (window.CACHE_INSTANCE) {
    const cachedInstance = window.CACHE_INSTANCE
    const cachedNode = cachedInstance._vnode
    router.apps.push(...cachedInstance.$router.apps)
    instance = new Vue({
      router,
      store,
      render: () => cachedNode,
    })

    router.onReady(() => {
      const { path } = router.currentRoute
      const { path: oldPath } = cachedInstance.$router.currentRoute
      // 当前路由和上一次卸载时不一致，则切换至新路由
      if (path !== oldPath) {
        cachedInstance.$router.push(path)
      }
    })
    instance.$mount(container ? container.querySelector('#car-app') : '#car-app')
  } else {
    instance = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount(container ? container.querySelector('#car-app') : '#car-app')
  }
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  const hasActiveRoute = GlobalState.globalTags.some((tag) => {
    const path = tag.path.replace('/' + BASE, '')
    const match = window.ROUTER.matcher.match(path)
    if (match.matched && match.matched.length) {
      return true
    }
  })
  if (hasActiveRoute) {
    const cachedInstance = instance.cachedInstance || instance
    if (!cachedInstance._vnode.data.keepAlive) {
      cachedInstance._vnode.data.keepAlive = true
    }
    cachedInstance.catchRoute = {
      apps: [...instance.$router.apps],
    }
    window.CACHE_INSTANCE = instance
    instance.$destroy()
  } else {
    window.CACHE_INSTANCE = null
  }
  window.ROUTER = null
  instance.$router.apps = []
}
