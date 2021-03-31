import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const root = {
  state: {
    cacheRoute: [],
  },
  mutations: {
    SET_CACHE_ROUTE(state, routes) {
      state.cacheRoute = routes
    },
  },
  actions: {
    addCacheRoute({ state, commit }, routeName) {
      const hasRoute = state.cacheRoute.some((r) => r == routeName)
      if (hasRoute) {
        return
      }
      commit('SET_CACHE_ROUTE', [...state.cacheRoute, routeName])
    },
    removeCacheRoute({ state, commit }, routeName) {
      const routes = state.cacheRoute.filter((r) => r !== routeName)
      commit('SET_CACHE_ROUTE', [...routes, routeName])
    },
  },
}

const store = new Vuex.Store(root)

export default store
