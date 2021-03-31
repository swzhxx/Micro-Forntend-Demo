import Vuex from 'vuex'
import Vue from 'vue'
import vuexSubscribeGlobalStatePlugin from './store-plugin/globalStateChangePlugin'

Vue.use(Vuex)

const root = {
  state: {
    tags: [],
    activeMicroApp: null,
    menus: [
      {
        name: 'VueApp购物车',
        path: '/vue_microapp/car',
      },
      { name: 'VueApp热销', path: '/vue_microapp/hot' },
      {
        name: 'PureApp个人中心',
        path: '/pure_app_personal',
      },
      { name: 'PureApp订单列表', path: '/pure_app_orders' },
    ],
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    SET_ACTIVE_MICRO_APP(state, app) {
      state.activeMicroApp = app
    },
  },
  actions: {
    addTag({ commit, state }, tag) {
      if (state.tags.some((_tag) => _tag.name == tag.name)) {
        return
      }
      commit(`SET_TAGS`, [...state.tags, tag])
    },
    removeTag({ commit, state }, tag) {
      let tags = state.tags.filter((_tag) => _tag.name != tag.name)
      commit(`SET_TAGS`, tags)
    },
  },
  plugins: [vuexSubscribeGlobalStatePlugin],
}

const store = new Vuex.Store(root)

export default store
