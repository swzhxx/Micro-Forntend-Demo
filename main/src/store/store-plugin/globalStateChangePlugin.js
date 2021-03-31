import { initGlobalState } from 'qiankun'
import globalState from './globalState'
const actions = initGlobalState(globalState)

const vuexSubscribeGlobalStatePlugin = (store) => {
  store.subscribe((mutation, state) => {
    console.log(`mutation`, mutation)
    console.log(`state`, state)
    if (mutation.type == 'SET_TAGS') {
      globalState.globalTags = state.tags
      actions.setGlobalState(globalState)
    }
  })
}

export default vuexSubscribeGlobalStatePlugin
export { actions }
