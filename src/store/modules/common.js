import { storage, radomStr } from '@/utils'

const state = {
  NIDUS_DATA_LACAL_NAME: 'localNidusDataList',
  nidusDataList: [] // 所有病灶数据[{type: 'reactangleioc', data: [{id: 'aaa', handleData: {}}]}]
}

const mutations = {
  SET_NIDUS_DATA_LIST: (state, value) => {
    state.nidusDataList = value
  }
}

const actions = {
  /**
   * {type: 'reactangleioc', data: [{id: 'aaa', handleData: {}}]}
   * @param {*} param0
   * @param {*} value
   */
  addNidus({ commit, state }, value) {
    const { type, id, handleData } = value
    let [typeData, curData] = [null, null]

    const list = storage().get(state.NIDUS_DATA_LACAL_NAME) || []
    typeData = list.find(v => v.type === type)

    if (!typeData) {
      typeData = { type: type, data: [] }
      list.push(typeData)
    }
    curData = typeData.data.find(v => v.id === id)

    if (!curData) {
      curData = { id: radomStr(32), handleData: {} }
      typeData.data.push(curData)
    }
    curData.handleData = handleData
    storage().set(state.NIDUS_DATA_LACAL_NAME, list)
    commit('SET_NIDUS_DATA_LIST', list)
    console.log('list...', list)
  },
  clearAllData() {
    storage().set(state.NIDUS_DATA_LACAL_NAME, [])
  }
}

const getters = {
  nidusDataList: state => storage().get(state.NIDUS_DATA_LACAL_NAME) || [], // 所有病灶数据
  allNidusList: state => {
    const list = storage().get(state.NIDUS_DATA_LACAL_NAME) || []
    const newList = []
    list.forEach(v => {
      v.data.forEach(o => {
        const newobj = { ...o, type: v.type }
        newList.push(newobj)
      })
    })
    return newList
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
