import { storage, radomStr } from '@/utils'
import commonApi from '@/api/common'

const state = {
  NIDUS_DATA_LACAL_NAME: 'localNidusDataList',
  nidusDataList: [], // 所有病灶数据[{type: 'reactangleioc', data: [{id: 'aaa', handleData: {}}]}]
  curentSeriesIndex: 0, // 当前操作的序列index
  seriesList: [], // 多序列
  stackList: [] // conerstoneTools多序列存储的对象
}

const mutations = {
  SET_CURRENT_SERIES_INDEX: (state, value) => {
    state.curentSeriesIndex = value
  },
  SET_SERIES_LIST: (state, value) => {
    state.seriesList = value
  },
  SET_STACK_LIST: (state, value) => {
    state.stackList = value
  },
  SET_NIDUS_DATA_LIST: (state, value) => {
    state.nidusDataList = value
  }
}

const actions = {
  setCurrentSeriersIndex({ commit, state }, value) {
    commit('SET_CURRENT_SERIES_INDEX', value)
  },
  querySeriers({ dispatch, commit, state }, value) {
    const seriesList = commonApi.querySeriers(value)
    commit('SET_SERIES_LIST', seriesList || [])
    // 初始化stackList
    dispatch('initStackList')
  },
  initStackList({ commit, state }, value) {
    const stacks = state.seriesList.map((series, index) => {
      return {
        seriesDescription: series.seriesDescription,
        stackId: series.seriesNumber,
        imageIds: series.imageIds,
        seriesIndex: index,
        currentImageIdIndex: 0,
        frameRate: series.frameRate
      }
    })
    commit('SET_STACK_LIST', stacks)
  },
  /**
   * {type: 'reactangleioc', data: [{id: 'aaa', handleData: {}}]}
   * @param {*} param0
   * @param {*} value
   */
  addNidus({ commit, state }, value) {
    const { type, id, handleData } = value
    let [typeData, curData] = [null, null]

    const list = storage().get(state.NIDUS_DATA_LACAL_NAME) || []
    typeData = list.find((v) => v.type === type)

    if (!typeData) {
      typeData = { type: type, data: [] }
      list.push(typeData)
    }
    curData = typeData.data.find((v) => v.id === id)

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
  curentSeriesIndex: (state) => state.curentSeriesIndex,
  seriesList: (state) => state.seriesList || [],
  stackList: (state) => state.stackList || [],
  nidusDataList: (state) => storage().get(state.NIDUS_DATA_LACAL_NAME) || [], // 所有病灶数据
  allNidusList: (state) => {
    const list = storage().get(state.NIDUS_DATA_LACAL_NAME) || []
    const newList = []
    list.forEach((v) => {
      v.data.forEach((o) => {
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
